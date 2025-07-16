import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  roleId: number;
  isActive: boolean;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      default: "",
    },
    secondName: {
      type: String,
      default: "",
    },
    roleId: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<IUser>("User", userSchema);
