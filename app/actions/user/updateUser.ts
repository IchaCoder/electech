"use server";

import dbConnect from "@/lib/dbConnect";
import User, { IUser } from "@/models/User";
import { PayloadType } from "@/types";
import { AuthResponseType } from "@/types/auth";
import jwt from "jsonwebtoken";

export const UpdateUser = async (token: string, data: Partial<IUser>) => {
  if (!token) {
    return { message: "Token not found", status: "error" } as AuthResponseType<any>;
  }

  await dbConnect();
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as PayloadType;

    await User.findByIdAndUpdate(payload.userId, data, { new: true });
    return { message: "User updated successfully", status: "success" } as AuthResponseType<any>;
  } catch (error: any) {
    return { message: "Could not update user", status: "error" } as AuthResponseType<any>;
  }
};
