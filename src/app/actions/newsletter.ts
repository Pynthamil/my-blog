"use server";

import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Server Action to handle newsletter subscriptions via Supabase and Resend.
 */
export async function subscribeToNewsletter(formData: FormData) {
  const email = (formData.get("email") as string)?.toLowerCase().trim();

  if (!email || !email.includes("@")) {
    return { error: "Please enter a valid email address." };
  }

  try {
    // 1. Check if the subscriber already exists in Supabase
    const { data: existing, error: fetchError } = await supabase
      .from("subscribers")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      return { success: true, message: "You're already on the list! 🎉" };
    }

    // 2. Insert into Supabase
    const { error: insertError } = await supabase
      .from("subscribers")
      .insert({ email });

    if (insertError) {
      if (insertError.code === "23505") { // Unique violation
        return { success: true, message: "You're already on the list! 🎉" };
      }
      throw insertError;
    }

    // 3. Optional: Notify or Welcome via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "pyndu logs <onboarding@resend.dev>", // Replace with verified domain if available
          to: email,
          subject: "You're in! Welcome to pyndu logs 🚀",
          html: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h1 style="color: #7c3aed;">Welcome to the grind! 🎉</h1>
            <p>Thanks for subscribing to <strong>pyndu logs</strong>. I'm excited to have you on board.</p>
            <p>You'll get occasional updates when I post new logs about coding, design experiments, and building in public.</p>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;" />
            <p style="font-size: 12px; color: #64748b;">If you didn't sign up for this, you can safely ignore this email.</p>
          </div>`,
        });
      } catch (resendError) {
        // We don't fail the whole action if Resend fails, as long as Supabase works
        console.error("[Newsletter] Resend failed but Supabase succeeded:", resendError);
      }
    }

    console.log(`[Newsletter] New Subscriber: ${email}`);
    return { success: true };
  } catch (error: any) {
    console.error("Newsletter submission error:", error);
    return { error: "Something went wrong. Please try again later." };
  }
}
