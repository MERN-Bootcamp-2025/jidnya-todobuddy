import { Router } from "express";

import { authenticateJWT } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/role.middleware";
import { UserController } from "../controllers/invite.controller";
const router = Router();

router.post("/invite", authenticateJWT, isAdmin, UserController.invite);
// router.get("/users", )

export default router;