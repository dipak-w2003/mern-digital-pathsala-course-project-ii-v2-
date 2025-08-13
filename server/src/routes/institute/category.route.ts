import { Router } from "express";
import { Middleware } from "../../middleware/middleware";
import { CategoryController } from "../../controllers/institute/course/category/category.controller";
import asyncErrorHandler from "../../services/asyncErrorHandler.service";

const router: Router = Router();

router
  .route("/")
  .post(
    Middleware.isLoggedIn,
    asyncErrorHandler(CategoryController.createCategory),
  )
  .get(
    Middleware.isLoggedIn,
    asyncErrorHandler(CategoryController.getCategories),
  );

router
  .route("/:id")
  .delete(
    Middleware.isLoggedIn,
    asyncErrorHandler(CategoryController.deleteCategory),
  );

export default router;
