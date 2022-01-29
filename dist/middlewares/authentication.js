"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user_model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    try {
        const token = authHeader.split(" ")[1].trim();
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        user_model_1.default.findById(decoded.id)
            .then((user) => user && next())
            .catch((err) => res.status(500).json(err));
        return;
    }
    catch (err) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
}
exports.default = auth;
