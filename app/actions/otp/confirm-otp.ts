"use server";

import { otpResponse } from "./generate-otp";

type ConfirmOtpType = {
  otp: string;
  number: string;
};
const ConfirmOtp = async (data: ConfirmOtpType) => {
  const finalData = {
    code: data.otp,
    number: data.number,
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
    console.log(res);
    if (res.code === "1105") {
      return { message: "Code expired", status: "error" };
    }
    return { ...res, status: "success" } as otpResponse & { status: "success" };
  } catch (error: any) {
    console.log(error);
    return { message: error.message, code: error.code, status: "error" };
  }
};

export default ConfirmOtp;
