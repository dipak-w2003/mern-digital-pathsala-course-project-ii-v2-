import express, { Router } from "express";
import { Middleware } from "../../../middleware/middleware";
import asyncErrorHandler from "../../../services/asyncErrorHandler.service";
import { TeacherController } from "../../../controllers/institute/teacher/teacher.controller";
// Multer Offline (Local) & Online (cloudinary)
import { upload as MulterLocalUpload } from "../../../middleware/multerUpload";
import { upload2 as MulterOnlineUpload } from "../../../middleware/multerUpload2";
const router: Router = express.Router();

router
  .route("/")
  .post(
    Middleware.isLoggedIn,
    MulterLocalUpload.single("teacherPhoto"),
    asyncErrorHandler(TeacherController.createTeacher)
  )
  .get(
    Middleware.isLoggedIn,
    asyncErrorHandler(TeacherController.readTeachers)
  );

router
  .route("/:id")
  .get(Middleware.isLoggedIn, asyncErrorHandler(TeacherController.readTeacher))
  .delete(
    Middleware.isLoggedIn,
    asyncErrorHandler(TeacherController.deleteTeacher)
  );

export default router;
