import mongoose from "mongoose";
import Participant, { IParticipant } from "./Participant";

export interface ICategory extends mongoose.Document {
  _id?: string;
  title: string;
  event_id: mongoose.Schema.Types.ObjectId | string;
  participants: IParticipant[];
  created_at?: string;
  updatedA_at?: string;
}

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    participants: [Participant],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
