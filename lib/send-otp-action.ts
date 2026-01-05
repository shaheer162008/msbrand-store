'use server';

import { generateOTP, sendOTPEmail } from './email-service';

export async function sendOTPAction(email: string, name: string): Promise<string> {
  try {
    const otp = generateOTP();
    await sendOTPEmail(email, otp, name);
    return otp;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP email');
  }
}
