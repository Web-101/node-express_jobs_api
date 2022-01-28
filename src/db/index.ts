import mongoose from "mongoose";

export function connect(DB_URI: string) {
  mongoose
    .connect(DB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
}
