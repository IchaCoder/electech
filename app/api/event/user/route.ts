import { NextRequest, NextResponse } from "next/server";
import Event, { IEvent } from "@/models/Event";
import { API_RESPONSE } from "@/lib/types";

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");
  const user_id = req.nextUrl.searchParams.get("user_id");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json<API_RESPONSE<any>>(
      { message: "Invalid authentication", status: "error", data: [] },
      { status: 401 }
    );
  }

  try {
    //  return all events that has user_id in event.voters array
    const events = await Event.find({ voters: { $in: [user_id] } });

    return NextResponse.json<API_RESPONSE<IEvent[]>>({
      data: events,
      status: "success",
      message: "Events fetched successfully",
    });
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return NextResponse.json<API_RESPONSE<any>>(
        { message: "Token has expired", status: "error", data: [] },
        { status: 401 }
      );
    }
    return NextResponse.json<API_RESPONSE<any>>(
      { message: "Could not fetch events", status: "error", data: [] },
      { status: 500 }
    );
  }
};
