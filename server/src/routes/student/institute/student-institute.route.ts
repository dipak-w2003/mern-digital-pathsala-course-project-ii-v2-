import express, { Router } from "express";
import { StudentInstituteController } from "../../../controllers/student/institute/student-institute.controller";
import { Middleware } from "../../../middleware/middleware";
import asyncErrorHandler from "../../../services/asyncErrorHandler.service";

const router: Router = express.Router();
router.route("/institute").get(
  // Middleware.isLoggedIn,
  asyncErrorHandler(StudentInstituteController.instituteListForStudent)
);

router
  .route("/institute/:instituteId/courses")
  .get(
    asyncErrorHandler(StudentInstituteController.instituteCourseListForStudent)
  );

export default router;
