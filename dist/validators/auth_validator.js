"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const validator = __importStar(require("express-validator"));
exports.registerSchema = validator.checkSchema({
    name: {
        isString: true,
        exists: true,
        isLength: {
            options: { min: 3, max: 30 },
        },
    },
    email: {
        isString: true,
        exists: true,
        isLength: {
            options: { max: 40 },
        },
        isEmail: true,
    },
    password: {
        isString: true,
        exists: true,
        isLength: {
            options: { min: 6, max: 30 },
        },
    },
    passwordConfirmation: {
        isString: { errorMessage: "Password confirmation must be a string" },
        exists: { errorMessage: "Password confirmation is required" },
        isLength: {
            options: { min: 6, max: 30 },
            errorMessage: "Password confirmation must be at least 6 characters long",
        },
        custom: {
            options: function (value, { req }) {
                if (value !== req.body.password) {
                    throw Error("Password confirmation must match password");
                }
                return value === req.body.password;
            },
        },
    },
});
exports.loginSchema = validator.checkSchema({
    email: {
        isString: true,
        exists: true,
        isLength: {
            options: { max: 40 },
        },
        isEmail: true,
    },
    password: {
        isString: true,
        exists: true,
        isLength: {
            options: { min: 6, max: 30 },
        },
    },
});
