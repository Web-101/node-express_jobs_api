"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const options = {
    timestamps: true,
};
const JobSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "CreatedBy field is required"],
    },
}, options);
exports.default = mongoose_1.default.model("Job", JobSchema);
