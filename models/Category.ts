import mongoose from "mongoose";

export interface ICategory extends mongoose.Document {
  _id?: string;
  title: string;
  event_id: mongoose.Schema.Types.ObjectId | string;
  participants: IParticipant[];
  created_at?: string;
  updatedA_at?: string;
}

export interface IParticipant extends mongoose.Document {
  _id: string;
  imgUrl?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  total_votes: number;
  created_at?: string;
  updated_at?: string;
}

const ParticipantSchema = new mongoose.Schema<IParticipant>(
  {
    imgUrl: {
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
    total_votes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const CategorySchema = new mongoose.Schema<ICategory>(
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
    participants: {
      type: [ParticipantSchema],
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
