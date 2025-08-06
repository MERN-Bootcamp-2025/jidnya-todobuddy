import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

//creating todo
router.post("/todos", authenticateJWT, TodoController.createTodo);

export default router;