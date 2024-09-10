"use server";
import dbConnect from "@/lib/dbConnect";
import Event, { IEvent } from "@/models/Event";
import { AuthResponseType } from "@/types/auth";
import { PayloadType } from "@/types";
import jwt from "jsonwebtoken";

export const UpdateEvent = async (data: Partial<IEvent>, id: string) => {
  try {
    await dbConnect();

    const event = await Event.findByIdAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });
    console.log(event);

    return { message: "Event updated successfully", status: "success" } as AuthResponseType<any>;
  } catch (error: any) {
    console.log(error.name);
    if (error.name === "TokenExpiredError") {
      return { message: "Token has expired", status: "error" } as AuthResponseType<any>;
    }

    return { message: "Could not update event", status: "error" } as AuthResponseType<any>;
  }
};
