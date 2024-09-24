"use server";

import { formatPhoneNumber } from "@/lib/helpers";

export interface otpResponse {
  message: string;
  ussd_code?: string;
  code: string;
}

const data = {
  expiry: 10,
  length: 6,
  medium: "sms",
  message: "This is OTP from Electech, %otp_code%",
  sender_id: "Electech",
  type: "numeric",
};

export const generateOTP = async (number: string) => {
  try {
    const response = await fetch("https://sms.arkesel.com/api/otp/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.SMS_API_KEY!,
      },
      body: JSON.stringify({ ...data, number: formatPhoneNumber(number) }),
    });
    const res = (await response.json()) as otpResponse;
    console.log(res);

    return res;
  } catch (error: any) {
    console.log(error);
    return { message: error.message, code: error.code };
  }
};
