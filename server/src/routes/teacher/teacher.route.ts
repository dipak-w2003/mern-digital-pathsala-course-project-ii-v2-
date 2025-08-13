import express, { Router } from "express";
import asyncErrorHandler from "../../services/asyncErrorHandler.service";
import { TeacherController } from "../../controllers/teacher/teacher.controller";
import { Middleware } from "../../middleware/middleware";

const router: Router = express.Router();
router
  .route("/login")
  .post(
    Middleware.isLoggedIn,
    asyncErrorHandler(TeacherController.teacherLogin)
  );

export default router;
