import express, { Router } from "express";
import { Middleware } from "../../../../middleware/middleware";
import { ChapterController } from "../../../../controllers/teacher/courses/chapters/chapter.controller";
import asyncErrorHandler from "../../../../services/asyncErrorHandler.service";
import { UserRole } from "../../../../middleware/type";

const router: Router = express.Router();
router
  .route("/:courseId/chapters/")
  .post(
    Middleware.isLoggedIn,
    Middleware.restrictTo(UserRole.Teacher),
    asyncErrorHandler(ChapterController.addChapterToCourse)
  )
  .get(
    Middleware.isLoggedIn,
    // Access given
    asyncErrorHandler(ChapterController.fetchCourseChapters)
  );

export default router;
