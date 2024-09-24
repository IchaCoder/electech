"use server";

import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";
import { AuthResponseType } from "@/types/auth";

export const AddVote = async (data: any) => {
  await dbConnect();
  try {
    const newData = Object.entries(data);
    newData.forEach(async ([categoryId, participantId]) => {
      await Category.updateOne(
        { _id: categoryId, "participants._id": participantId },
        {
          $inc: {
            "participants.$.total_votes": 1,
          },
        }
      );
    });
    return { message: "Vote added", status: "success" } as AuthResponseType<any>;
  } catch (error) {
    console.log(error);
    return { message: "Internal server error", status: "error" } as AuthResponseType<any>;
  }
};
