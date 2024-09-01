"use server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export const VerifyAccount = async (email: string) => {
  await dbConnect();

  try {
    await User.updateOne({ email }, { is_verified: true });
    return { message: "Account verified successfully", status: "success" };
  } catch (error) {
    console.log(error);

    return { message: "Could not verify account", status: "error" };
  }
};
