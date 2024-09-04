"use server";

import dbConnect from "@/lib/dbConnect";
import Event, { IEvent } from "@/models/Event";
import { PayloadType } from "@/types";
import { AuthResponseType } from "@/types/auth";
import jwt from "jsonwebtoken";

export const AddEventRequest = async (data: IEvent, token: string) => {
  if (!token) {
    return { message: "Token not found", status: "error" } as AuthResponseType<any>;
  }

  try {
    // Check if token from local storage is valid
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as PayloadType;

    await dbConnect();

    await Event.create({ ...data, added_by: payload.userId });

    return { message: "Event created successfully", status: "success" } as AuthResponseType<any>;
  } catch (error: any) {
    console.log(error.name);
    if (error.name === "TokenExpiredError") {
      return { message: "Token has expired", status: "error" } as AuthResponseType<any>;
    }

    return { message: "Could not create event", status: "error" } as AuthResponseType<any>;
  }
};
