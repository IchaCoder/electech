"use server";
import dbConnect from "@/lib/dbConnect";
import Event, { IEvent } from "@/models/Event";
import { AuthResponseType } from "@/types/auth";
import { PayloadType } from "@/types";
import jwt from "jsonwebtoken";

export const UpdateEvent = async (data: Partial<IEvent>, token: string) => {
  if (!token) {
    return { message: "Token not found", status: "error" } as AuthResponseType<any>;
  }
  await dbConnect();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as PayloadType;

    const event = await Event.findByIdAndUpdate({ _id: payload.userId }, data, {
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
