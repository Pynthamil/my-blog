"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Server Action to handle newsletter subscriptions via Resend.
 */
export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return { error: "Please enter a valid email address." };
  }

  try {
    // Add the contact to Resend
    // Note: You must have a domain verified or a default audience in Resend
    await resend.contacts.create({
      email: email,
      unsubscribed: false,
    });

    console.log(`[Newsletter] Subscribed: ${email}`);
    
    return { success: true };
  } catch (error: any) {
    console.error("Newsletter submission error:", error);
    
    // Handle specific Resend errors if needed
    if (error.message?.includes("API key")) {
      return { error: "Newsletter service not configured. Please check API key." };
    }
    
    return { error: "Something went wrong. Please try again later." };
  }
}
