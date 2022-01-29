"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function connect(DB_URI) {
    mongoose_1.default
        .connect(DB_URI)
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.log(err));
}
exports.connect = connect;
