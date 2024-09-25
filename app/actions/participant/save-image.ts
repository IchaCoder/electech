"use server";

import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";
import { AuthResponseType } from "@/types/auth";

export const SaveImageUrl = async (categoryId: string, participantId: string, url: string) => {
  await dbConnect();
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return { message: "Category not found", status: "error" } as AuthResponseType<any>;
    }

    await Category.updateOne(
      { _id: categoryId, "participants._id": participantId },
      {
        $set: {
          "participants.$.imgUrl": url,
        },
      }
    );
    return { message: "Participant updated", status: "success" } as AuthResponseType<any>;
  } catch (error) {
    console.log(error);
    return { message: "Internal server error", status: "error" } as AuthResponseType<any>;
  }
};
