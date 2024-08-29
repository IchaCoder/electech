import { User } from "lucide-react";
import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  role: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: [3, "Name cannot be less than 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
