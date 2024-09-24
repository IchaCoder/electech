"use server";

import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";
import { AuthResponseType } from "@/types/auth";

export const DeleteCategoryRequest = async (categoryId: string) => {
  await dbConnect();
  try {
    const category = await Category.findByIdAndDelete({ _id: categoryId });
    if (!category) {
      return { message: "Category not found", status: "error" } as AuthResponseType<any>;
    }
    return { message: "Category deleted", status: "success" } as AuthResponseType<any>;
  } catch (error) {
    console.log(error);
    return { message: "Internal server error", status: "error" } as AuthResponseType<any>;
  }
};
