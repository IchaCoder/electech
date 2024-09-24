"use server";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";
import { ICategory } from "@/models/Category";
import { PayloadType } from "@/types";
import { AuthResponseType } from "@/types/auth";
import jwt from "jsonwebtoken";

const AddCategoryRequest = async (data: Partial<ICategory>[], token: string) => {
  if (!token) {
    return { message: "Token not found", status: "error" } as AuthResponseType<any>;
  }

  try {
    // Check if token from local storage is valid
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as PayloadType;

    await dbConnect();

    data.forEach(async (category) => {
      await Category.create({ ...category, added_by: payload.userId });
    });

    return { message: "Category created successfully", status: "success" } as AuthResponseType<any>;
  } catch (error: any) {
    console.log(error.name);
    if (error.name === "TokenExpiredError") {
      return { message: "Token has expired", status: "error" } as AuthResponseType<any>;
    }

    return { message: "Could not create category", status: "error" } as AuthResponseType<any>;
  }
};

export default AddCategoryRequest;
