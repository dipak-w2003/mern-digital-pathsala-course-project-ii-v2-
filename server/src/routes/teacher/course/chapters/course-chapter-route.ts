import express, { Router } from "express";
import { Middleware } from "../../../../middleware/middleware";
import { ChapterController } from "../../../../controllers/teacher/courses/chapters/chapter.controller";
import asyncErrorHandler from "../../../../services/asyncErrorHandler.service";

const router: Router = express.Router();
router
  .route("/course/:courseId/chapters/")
  .post(
    Middleware.isLoggedIn,
    asyncErrorHandler(ChapterController.addChapterToCourse)
  )
  .get(
    Middleware.isLoggedIn,
    asyncErrorHandler(ChapterController.addChapterToCourse)
  );

export default router;
