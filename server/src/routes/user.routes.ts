import { Router } from "express";
import { fetchUsers } from "../controllers/user.controller";

const router = Router();

router.get("/", fetchUsers);

export default router;
