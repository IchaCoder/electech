"use server";

import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";
import { AuthResponseType } from "@/types/auth";

export const DeleteEvent = async (id: string) => {
  try {
    await dbConnect();

    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return { message: "not-found", status: "error" } as AuthResponseType<any>;
    }

    return { message: "Event deleted successfully", status: "success" } as AuthResponseType<any>;
  } catch (error) {
    return { message: "Could not delete event", status: "error" } as AuthResponseType<any>;
  }
};
