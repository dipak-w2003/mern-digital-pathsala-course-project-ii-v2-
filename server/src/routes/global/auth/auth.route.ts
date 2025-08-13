import express, { Router } from "express";
import { AuthController } from "../../../controllers/global/auth/auth.controller";
import asyncErrorHandler from "../../../services/asyncErrorHandler.service";

const router: Router = Router();
router.route("/register").post(asyncErrorHandler(AuthController.registerUser));
router.route("/login").post(asyncErrorHandler(AuthController.loginUser));

export default router;
