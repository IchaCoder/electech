"use server";

import dbConnect from "@/lib/dbConnect";
import { API_RESPONSE } from "@/lib/types";
import Event, { IEvent } from "@/models/Event";

export const GetEvent = async (id: string) => {
  try {
    await dbConnect();

    const event = await Event.findById(id);
    console.log("event", event);
    if (!event) {
      return { message: "not-found", status: "error" } as API_RESPONSE<IEvent>;
    }

    return { message: "Event fetched successfully", status: "success", data: event } as API_RESPONSE<IEvent>;
  } catch (error) {
    return { message: "Could not fetch event", status: "error" } as API_RESPONSE<IEvent>;
  }
};
