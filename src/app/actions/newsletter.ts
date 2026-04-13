"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

/**
 * Server Action to handle newsletter subscriptions via Resend Audiences.
 * This approach is more developer-friendly and integrates directly with Resend contacts.
 */
export async function subscribeToNewsletter(formData: FormData) {
  const emailInput = (formData.get("email") as string)?.toLowerCase().trim();

  // 1. Validate email with Zod
  const validation = newsletterSchema.safeParse({ email: emailInput });
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  const { email } = validation.data;

  if (!process.env.RESEND_API_KEY || !AUDIENCE_ID) {
    console.error("[Newsletter] Missing RESEND_API_KEY or RESEND_AUDIENCE_ID.");
    return { error: "Newsletter service is not configured yet." };
  }

  try {
    // 2. Create contact in Resend Audience
    const { error } = await resend.contacts.create({
      email: email,
      audienceId: AUDIENCE_ID,
      unsubscribed: false, // This means they are subscribed
    });

    if (error) {
      // Check if the user is already subscribed (Resend returns specific error messages)
      const isDuplicate = error.message.toLowerCase().includes("already exists") || 
                          error.message.toLowerCase().includes("duplicate");
      
      if (isDuplicate) {
        return { success: true, message: "You're already on the list! 🎉" };
      }
      
      throw error;
    }

    console.log(`[Newsletter] New Subscriber: ${email}`);
    return { success: true, message: "You're in ✨" };

  } catch (error: any) {
    console.error("Resend Audience submission error:", error);
    return { error: "Something went wrong. Please try again later." };
  }
}
