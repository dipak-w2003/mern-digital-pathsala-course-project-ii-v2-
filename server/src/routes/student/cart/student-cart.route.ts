import express, { Router } from "express";
import asyncErrorHandler from "../../../services/asyncErrorHandler.service";
import { Middleware } from "../../../middleware/middleware";
import { StudentCartController } from "../../../controllers/student/cart/student-cart.controller";
import { UserRole } from "../../../middleware/type";

const router: Router = express.Router();
router
  .route("/cart")
  .post(
    Middleware.isLoggedIn,
    Middleware.changeUserIdForTableName,
    Middleware.restrictTo(UserRole.Student, UserRole.Institute),
    asyncErrorHandler(StudentCartController.insertIntoCartTableOfStudent)
  )
  .get(
    Middleware.isLoggedIn,
    Middleware.changeUserIdForTableName,
    Middleware.restrictTo(UserRole.Student),
    asyncErrorHandler(StudentCartController.fetchStudentCartItems)
  );

export default router;
