import express, { Router } from "express";
import { Middleware } from "../../../../middleware/middleware";
import { ChapterController } from "../../../../controllers/teacher/courses/chapters/chapter.controller";
import asyncErrorHandler from "../../../../services/asyncErrorHandler.service";
import { UserRole } from "../../../../middleware/type";
import { LessonController } from "../../../../controllers/teacher/courses/lessons/lesson.controller";

const router: Router = express.Router();
router
  .route("/course/:courseId/chapters/")
  .post(
    Middleware.isLoggedIn,
    Middleware.restrictTo(UserRole.Teacher),
    asyncErrorHandler(LessonController.createChapterLesson)
  )
  .get(
    Middleware.isLoggedIn,
    // Access given
    asyncErrorHandler(LessonController.fetchChapterLesson)
  );

export default router;
