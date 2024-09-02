import exp from "constants";
import mongoose from "mongoose";

export interface IParticipant extends mongoose.Document {
  _id: string;
  imageUrl?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  created_at?: string;
  updated_at?: string;
}

const ParticipantSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
    },
    first_name: {
      type: String,
      required: true,
    },
    middle_name: {
      type: String,
    },
    last_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.models.Participant || mongoose.model<IParticipant>("Participant", ParticipantSchema);
