"use server";
import { IParticipant } from "@/models/Category";
import { PayloadType } from "@/types";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import Category, { ICategory } from "@/models/Category";
import { AuthResponseType } from "@/types/auth";

export const AddParticipantRequest = async (categoryId: string, token: string, data: IParticipant[]) => {
  if (!token) {
    return { message: "Token not found", status: "error" } as AuthResponseType<any>;
  }

  try {
    // Check if token from local storage is valid
    jwt.verify(token, process.env.JWT_SECRET!) as PayloadType;

    await dbConnect();

    const category = (await Category.findById(categoryId)) as ICategory;
    if (!category) {
      return { message: "Category not found", status: "error" } as AuthResponseType<any>;
    }

    data.forEach((participant) => {
      category.participants.push(participant);
    });
    await category.save();
    return { message: "Participant added successfully", status: "success" } as AuthResponseType<any>;
  } catch (error: any) {
    console.log(error);

    if (error.name === "TokenExpiredError") {
      return { message: "Token has expired", status: "error" } as AuthResponseType<any>;
    }
    return { message: "Could not add participant", status: "error" } as AuthResponseType<any>;
  }
};
