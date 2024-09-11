import { API_RESPONSE } from "@/lib/types";
import Category from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");
  const eventId = req.nextUrl.searchParams.get("event_id");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json<API_RESPONSE<any>>(
      { message: "Invalid authentication", status: "error", data: [] },
      { status: 401 }
    );
  }

  try {
    const categories = await Category.find({ event_id: eventId });
    // console.log(categories);

    if (categories.length === 0) {
      return NextResponse.json<API_RESPONSE<any>>(
        {
          data: [],
          status: "success",
          message: "No categories found",
        },
        {
          status: 200,
        }
      );
    }

    return NextResponse.json<API_RESPONSE<any>>(
      {
        data: categories,
        status: "success",
        message: "Categories fetched successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json({ message: "Could not fetch events", status: "error" }, { status: 500 });
  }
  return NextResponse.json({ message: "Hello World" });
};
