"use server";
import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";

export const RecordVoter = async (eventId: string, voterId: string) => {
  await dbConnect();
  try {
    const event = await Event.findById({ _id: eventId });
    if (!event) {
      return { message: "Event not found", status: "error" };
    }

    event.voters.push(voterId);
    await event.save();

    return { message: "Voter recorded", status: "success" };
  } catch (error: any) {
    console.log(error);

    return { message: "Could not record voter", status: "error" };
  }
};
