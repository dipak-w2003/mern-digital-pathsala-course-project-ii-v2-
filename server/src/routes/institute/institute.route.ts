import { Router } from "express";
import { InstituteController } from "../../controllers/institute/institute.controller";
import { Middleware } from "../../middleware/middleware";

const router: Router = Router();
router
  .route("/")
  .post(
    Middleware.isLoggedIn,
    InstituteController.createInstitute,
    InstituteController.createTeacherTable,
    InstituteController.createCourseChapter,
    InstituteController.createStudentTable,
    InstituteController.createCategoryTable,
    InstituteController.createCourseTable
  );

export default router;
/*
 */
