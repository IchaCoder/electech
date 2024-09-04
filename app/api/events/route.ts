import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PayloadType } from "@/types";
import Event, { IEvent } from "@/models/Event";
import { API_RESPONSE } from "@/lib/types";

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json<API_RESPONSE<any>>(
      { message: "Invalid authentication", status: "error", data: [] },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as PayloadType;

    const events = await Event.find({ added_by: payload.userId });

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
