import mongoose from "mongoose";

const options = {
  timestamps: true,
};

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company field is required"],
      minlength: [3, "Company field must be at least 3 characters long"],
      maxlength: [50, "Company field must be at most 50 characters long"],
    },

    position: {
      type: String,
      required: [true, "Position field is required"],
      minlength: [3, "Position field must be at least 3 characters long"],
      maxlength: [50, "Position field must be at most 50 characters long"],
    },
    
    status: {
      type: String,
      required: [true, "Status field is required"],
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "CreatedBy field is required"],
    },
  },
  options
);

export default mongoose.model("Job", JobSchema);