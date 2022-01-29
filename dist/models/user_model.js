"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// constants
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// schema
const UserSchema = new mongoose_1.default.Schema({
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
UserSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(this.password, salt);
        this.password = hashedPassword;
    });
});
// methods
UserSchema.methods.generateToken = function () {
    const user = {
        id: this._id,
        name: this.name,
        email: this.email,
    };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: process.env.JWT_LIFETIME };
    const token = jsonwebtoken_1.default.sign(user, secret, options);
    return { user, token };
};
UserSchema.methods.comparePassword = function (queryPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const isMatch = yield bcryptjs_1.default.compare(queryPassword, this.password);
        if (!isMatch) {
            throw new Error("Invalid password");
        }
        return isMatch;
    });
};
exports.default = mongoose_1.default.model("User", UserSchema);
