"use server";

import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";
import { AuthResponseType } from "@/types/auth";

export const UpdateParticipantRequest = async (categoryId: string, participantId: string, data: any) => {
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
          "participants.$.first_name": data.first_name,
          "participants.$.middle_name": data.middle_name,
          "participants.$.last_name": data.last_name,
          // "participants.$.imgUrl": data.imgUrl,
        },
      }
    );
    return { message: "Participant updated", status: "success" } as AuthResponseType<any>;
  } catch (error) {
    console.log(error);
    return { message: "Internal server error", status: "error" } as AuthResponseType<any>;
  }
};
