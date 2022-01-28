import express from "express";
import * as controller from "../controllers/auth_controller";
import { registerSchema } from "../validators/auth_validator";

const router = express.Router();

router.route("/register").post(registerSchema, controller.register);

router.route("/login").post(controller.login);

export default router;
