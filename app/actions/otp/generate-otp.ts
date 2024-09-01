"use client";

export interface otpResponse {
  message: string;
  ussd_code?: string;
  code: string;
}

const data = {
  expiry: 5,
  length: 4,
  medium: "sms",
  message: "This is OTP from Electech, %otp_code%",
  number: "233555543385",
  sender_id: "Electech",
  type: "numeric",
};

export const generateOTP = async () => {
  try {
    const response = await fetch("https://sms.arkesel.com/api/otp/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.SMS_API_KEY!,
      },
      body: JSON.stringify(data),
    });
    const res = (await response.json()) as otpResponse;
    return res;
  } catch (error: any) {
    console.log(error);
    return { message: error.message, code: error.code };
  }
};
