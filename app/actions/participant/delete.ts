"use server";

import dbConnect from "@/lib/dbConnect";
import Category, { ICategory } from "@/models/Category";
import { AuthResponseType } from "@/types/auth";

export const DeleteParticipantRequest = async (categoryId: string, participantId: string, token: string) => {
  if (!token) {
    return { message: "Token not found", status: "error" } as AuthResponseType<any>;
  }

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return { message: "Category not found", status: "error" } as AuthResponseType<any>;
    }

    const removed = await Category.findByIdAndUpdate(
      categoryId,
      {
        $pull: { participants: { _id: participantId } }, // Pull participant by ID from participants array
      },
      { new: true }
    );

    console.log("participant r", removed);
    return { message: "Participant removed", status: "success" } as AuthResponseType<ICategory>;
  } catch (error) {
    console.log(error);
    return { message: "Internal server error", status: "error" } as AuthResponseType<any>;
  }
};
