import { Request, Router } from "express";
import { Middleware } from "../../../middleware/middleware";
import { CourseController } from "../../../controllers/institute/course/course.controller";
import asyncErrorHandler from "../../../services/asyncErrorHandler.service";
// Two Multer Uploads
import { upload as MulterLocalUpload } from "../../../middleware/multerUpload";
import { upload2 as MulterOnlineUpload } from "../../../middleware/multerUpload2";
import { UserRole } from "../../../middleware/type";

const router: Router = Router();

router
  .route("/")
  .post(
    Middleware.isLoggedIn,
    Middleware.restrictTo(UserRole.Institute),
    MulterLocalUpload.single("courseThumbnail"),
    asyncErrorHandler(CourseController.createCourse)
  )
  .get(Middleware.isLoggedIn, asyncErrorHandler(CourseController.getAllCourse));

router
  .route("/:id")
  .get(
    Middleware.isLoggedIn,

    asyncErrorHandler(CourseController.getSingleCourse)
  )
  .delete(
    Middleware.isLoggedIn,
    Middleware.restrictTo(UserRole.Institute),
    asyncErrorHandler(CourseController.deleteCourse)
  );

export default router;
/**
 

http POST http://localhost:3000/api/institute \
Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ3NGZlNDQzLWYyYzYtNGY3MC04MDkyLWU2YzYyYzE2MDE4MCIsImlhdCI6MTc1MTA5ODg3NSwiZXhwIjoxNzU4ODc0ODc1fQ.zy4E9AdGapvDhUO9Xe8yVA4Sgo5xhXZ-b6AKMO7rqXY" \
  instituteName="su" \
  instituteEmail="su@example.com" \
  institutePhoneNumber="su" \
  instituteAddress="su" \
  institutePanNo="su" \
  instituteVatNo="su"





http POST http://localhost:3000/api/institute/course \
  Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ3NGZlNDQzLWYyYzYtNGY3MC04MDkyLWU2YzYyYzE2MDE4MCIsImlhdCI6MTc1MTA5ODg3NSwiZXhwIjoxNzU4ODc0ODc1fQ.zy4E9AdGapvDhUO9Xe8yVA4Sgo5xhXZ-b6AKMO7rqXY" \
courseName="C Programming"   \
coursePrice=888    \
courseDuration="85 Days"    \
courseLevel="beginner"    \
courseDescription="loremIspum"    \
courseThumbnail="loremIspum"    \
   



Form based during file upload

ttp --form POST http://localhost:3000/api/institute/course 
\
                                         Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ3NGZlNDQzLWYyYzYtNGY3MC04MDkyLWU2YzYyYzE2MDE4MCIsImlhdCI6MTc1MTA5ODg3NSwiZXhwIjoxNzU4ODc0ODc1fQ.zy4E9AdGapvDhUO9Xe8yVA4Sgo5xhXZ-b6AKMO7rqXY" \
                                         courseName="C Programming 3" \
                                         coursePrice=888 \
                                         courseDuration="85 Days" \
                                         courseLevel="beginner" \
                                         courseDescription="loremIspum" \
                                         courseThumbnail@./system-design-1.jpg


 */
