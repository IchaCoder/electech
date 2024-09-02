"use server";

import dbConnect from "@/lib/dbConnect";
import Category, { ICategory } from "@/models/Category";
import { PayloadType } from "@/types";
import { AuthResponseType } from "@/types/auth";
import jwt from "jsonwebtoken";

export const UpdateCategory = async (data: Partial<ICategory>, token: string) => {
  if (!token) {
    return { message: "Token not found", status: "error" } as AuthResponseType<any>;
  }
  await dbConnect();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as PayloadType;

    await Category.findByIdAndUpdate({ _id: payload.userId }, data, {
      new: true,
      runValidators: true,
    });

    return { message: "Category updated successfully", status: "success" } as AuthResponseType<any>;
  } catch (error: any) {
    console.log(error.name);
    if (error.name === "TokenExpiredError") {
      return { message: "Token has expired", status: "error" } as AuthResponseType<any>;
    }
    return { message: "Could not update category", status: "error" } as AuthResponseType<any>;
  }
};
