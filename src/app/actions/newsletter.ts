"use server";

import { supabase } from "@/lib/supabase";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

/**
 * Server Action to handle newsletter subscriptions via Supabase.
 */
export async function subscribeToNewsletter(formData: FormData) {
  const emailInput = (formData.get("email") as string)?.toLowerCase().trim();

  // 1. Validate email with Zod
  const validation = newsletterSchema.safeParse({ email: emailInput });
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  const { email } = validation.data;

  try {
    // 2. Create contact in Supabase
    const { error } = await supabase
      .from('subscribers')
      .insert([{ email }]);

    if (error) {
      // Check if duplicate (unique constraint violation)
      // Supabase PostgreSQL returns 23505 for unique violation
      if (error.code === '23505') {
        return { success: true, message: "You're already on the list! 🎉" };
      }
      throw error;
    }

    console.log(`[Newsletter] New Subscriber: ${email}`);
    return { success: true, message: "You're in ✨" };

  } catch (error: any) {
    console.error("Newsletter submission error:", error);
    return { error: "Something went wrong. Please try again later." };
  }
}
