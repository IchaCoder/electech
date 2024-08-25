import mongoose from "mongoose";

export interface User extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  role: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema<User>({
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
    unique: true,
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
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
