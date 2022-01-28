import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
    minlength: [3, "Name field must be at least 3 characters long"],
    maxlength: [30, "Name field must be at most 30 characters long"],
  },

  email: {
    type: String,
    required: [true, "Email field is required"],
    unique: true,
    maxlength: [40, "Email field must be at most 40 characters long"],
    match: [emailRegex, "Email field must be a valid email address"],
  },

  password: {
    type: String,
    required: [true, "Password field is required"],
  },
});

UserSchema.pre("save", async function (): Promise<void> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;
});

export default mongoose.model("User", UserSchema);
