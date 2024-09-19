"use server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import User, { IUser } from "@/models/User";
import { AuthResponseType } from "@/types/auth";
import { PayloadType } from "@/types";
import { redirect } from "next/navigation";

const GetUser = async (token: string) => {
  if (!token) {
    return { message: "Token not found", status: "error" } as AuthResponseType<any>;
  }

  await dbConnect();
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as PayloadType;

    const user = await User.findById({ _id: payload.userId });

    return { message: "User found", status: "success", user } as AuthResponseType<IUser>;
  } catch (error: any) {
    console.log(error.name);
    if (error.name === "TokenExpiredError") {
      redirect("/login");
    }

    return { message: "Could not find user", status: "error", user: null } as AuthResponseType<any>;
  }
};

export default GetUser;
