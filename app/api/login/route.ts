import User, { IUser } from "@/models/User";
import { AuthResponseType } from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import dbConnect from "@/lib/dbConnect";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json<AuthResponseType<any>>(
      { message: "Please provide email or password", status: "error" },
      { status: 400 }
    );
  }

  await dbConnect();

  try {
    const user = (await User.findOne({ email })) as IUser;

    if (!user) {
      return NextResponse.json<AuthResponseType<any>>({ message: "User not found", status: "error" }, { status: 404 });
    }

    const isPasswordMatch = await argon2.verify(user.password, password);

    if (!isPasswordMatch) {
      return NextResponse.json<AuthResponseType<any>>(
        { message: "Invalid credentials", status: "error" },
        { status: 401 }
      );
    }
    // TO DO: Change token expiration to 1h
    const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET!, { expiresIn: "30d" });

    return NextResponse.json<AuthResponseType<Partial<IUser>>>(
      {
        message: "Login successful",
        token,
        status: "success",
        user: { name: user.name, email: user.email, is_verified: user.is_verified },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json<AuthResponseType<any>>(
      { message: "Login not successful", status: "error" },
      { status: 500 }
    );
  }
};
