import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User, { IUser } from "@/models/User";
import { AuthResponseType } from "@/types/auth";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
  const { name, email, phone, password, role } = (await request.json()) as IUser;

  await dbConnect();

  try {
    // Argon2id is the default variant
    const hashedPassword = await argon2.hash(password);
    // update the name of a field we want to rename programmatically
    // const u = await User.updateMany({}, { $rename: { verfied: "is_verified" } });
    // console.log(u);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });
    const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET!, { expiresIn: "5h" });

    // const res = await generateOTP();
    // console.log(res);

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
