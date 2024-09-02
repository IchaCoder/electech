import mongoose from "mongoose";

export interface IEvent extends mongoose.Document {
  _id?: string;
  title: string;
  due_date: string;
  start_date: string;
  due_time: string;
  start_time: string;
  is_lock_event: boolean;
  added_by: mongoose.Types.ObjectId | string;
  org_domain?: string;
  is_ended: boolean;
  created_at?: string;
  updated_at?: string;
}

// EventSchema will correspond to a collection in your MongoDB database.
const EventSchema = new mongoose.Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    due_date: {
      type: String,
      required: [true, "Please provide a due date"],
    },
    start_date: {
      type: String,
      required: [true, "Please provide a start date"],
    },
    due_time: {
      type: String,
      required: [true, "Please provide a due time"],
    },
    start_time: {
      type: String,
      required: [true, "Please provide a start time"],
    },
    is_lock_event: {
      type: Boolean,
      default: false,
    },
    org_domain: {
      type: String,
    },
    is_ended: {
      type: Boolean,
      default: false,
    },
    added_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

export default mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
