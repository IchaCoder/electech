"use server";

import dbConnect from "@/lib/dbConnect";
import { otpResponse } from "./generate-otp";
import User from "@/models/User";

type ConfirmOtpType = {
  otp: string;
  id: string;
};
// const ConfirmOtp = async (data: ConfirmOtpType) => {
//   const finalData = {
//     code: data.otp,
//     number: data.number,
//     api_key: process.env.SMS_API_KEY,
//   };

//   try {
//     const response = await fetch("https://sms.arkesel.com/api/otp/verify", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "api-key": process.env.SMS_API_KEY!,
//       },
//       body: JSON.stringify(finalData),
//     });
//     const res = await response.json();
//     console.log(res);
//     if (res.code === "1105") {
//       return { message: "Code expired", status: "error" };
//     }
//     return { ...res, status: "success" } as otpResponse & { status: "success" };
//   } catch (error: any) {
//     console.log(error);
//     return { message: error.message, code: error.code, status: "error" };
//   }
// };

const ConfirmOtp = async (data: ConfirmOtpType) => {
  await dbConnect();
  try {
    const user = await User.findById(data.id);

    if (!user) {
      return { message: "User not found", status: "error" };
    }
    if (user.otp !== data.otp) {
      return { message: "Invalid OTP", status: "error" };
    }
    console.log(user.otp === data.otp);

    if (user.otp === data.otp) {
      user.is_verified = true;
      user.otp = "";
      await user.save();
    }
    return { message: "User verified", status: "success" };
  } catch (error: any) {
    console.log(error);
    return { message: error.message, status: "error" };
  }
};

export default ConfirmOtp;
