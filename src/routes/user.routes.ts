import { Router } from "express";

import { authenticateJWT } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/role.middleware";
import { UserController } from "../controllers/users.controller";

const router = Router();

//sending email from super admin to users
router.post("/invite", authenticateJWT, isAdmin, UserController.invite);

//get all users
router.get("/users", UserController.getAllUsers)

export default router;