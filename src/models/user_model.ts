import mongoose, { Types } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// constants
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// interfaces
interface userInterface {
  id: string;
  name: string;
  email: string;
}

interface tokenizedUserInterface {
  user: userInterface;
  token: string;
}

// schema
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

// middleware
UserSchema.pre("save", async function (): Promise<void> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;
});

// methods
UserSchema.methods.generateToken = function (): tokenizedUserInterface {
  const user: userInterface = {
    id: this._id,
    name: this.name,
    email: this.email,
  };
  const secret = process.env.JWT_SECRET as string;
  const options = { expiresIn: process.env.JWT_LIFETIME as string };

  const token = jwt.sign(user, secret, options);

  return { user, token };
};

export default mongoose.model("User", UserSchema);
