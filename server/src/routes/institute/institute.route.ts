import { Router } from "express";
import { InstituteController } from "../../controllers/institute/institute.controller";
import { Middleware } from "../../middleware/middleware";
import asyncErrorHandler from "../../services/asyncErrorHandler.service";
import { UserRole } from "../../middleware/type";
const router: Router = Router();
router
  .route("/")
  .post(
    Middleware.isLoggedIn,
    Middleware.restrictTo(UserRole.Institute),
    asyncErrorHandler(InstituteController.createInstitute),
    asyncErrorHandler(InstituteController.createTeacherTable),
    asyncErrorHandler(InstituteController.createStudentTable),
    asyncErrorHandler(InstituteController.createCategoryTable),
    asyncErrorHandler(InstituteController.createCourseTable),
    asyncErrorHandler(InstituteController.createCourseChapter),
    asyncErrorHandler(InstituteController.createChapterLessonTable)
  );

export default router;
/*
 */
