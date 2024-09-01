"use server";

import { otpResponse } from "./generate-otp";

type ConfirmOtpType = {
  otp: string;
  phone: string;
};
const ConfirmOtp = async (data: ConfirmOtpType) => {
  const finalData = {
    ...data,
    api_key: process.env.SMS_API_KEY,
  };

  try {
    const response = await fetch("https://sms.arkesel.com/api/otp/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.SMS_API_KEY!,
      },
      body: JSON.stringify(finalData),
    });
    const res = await response.json();
    return { ...res, status: "success" } as otpResponse & { status: "success" };
  } catch (error: any) {
    console.log(error);
    return { message: error.message, code: error.code, status: "error" };
  }
};

export default ConfirmOtp;
