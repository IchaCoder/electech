import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User, { IUser } from "@/models/User";
import { AuthResponseType } from "@/types/auth";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { generateOTP } from "@/lib/helpers";

export const POST = async (request: NextRequest) => {
  const { name, email, phone, password, role } = (await request.json()) as IUser;

  await dbConnect();

  try {
    // Argon2id is the default variant
    // Argon2id config is recommended by Internet Engineering Task Force (IETF) for auth
    const hashedPassword = await argon2.hash(password, {
      memoryCost: 2 ** 16,
      parallelism: 4,
    });

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET!, { expiresIn: "5h" });

    const otp = generateOTP();
    await User.findByIdAndUpdate({ _id: user._id }, { otp }, { new: true, runValidators: true });

    await fetch(`https://nodemailerr.onrender.com/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `<div> Your code is <strong>${otp}</strong></div>`,
        to: user.email,
      }),
    });

    return NextResponse.json<AuthResponseType<Partial<IUser>>>(
      {
        message: "User created successfully",
        token,
        status: "success",
        user: { name: user.name },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    if (error.code === 11000) {
      return NextResponse.json<AuthResponseType<any>>(
        { message: "User already exists", status: "error" },
        { status: 400 }
      );
    }

    return NextResponse.json<AuthResponseType<any>>(
      { message: "Signup not successful", status: "error" },
      { status: 500 }
    );
  }
};
