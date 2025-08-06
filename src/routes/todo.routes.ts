import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

//creating todo
router.post("/todos", authenticateJWT, TodoController.createTodo);

//get all todos
router.get("/todos", authenticateJWT, TodoController.getTodos);

//get todo by id
router.get("/todos/:id", authenticateJWT, TodoController.getTodoById);

//update todo by id
router.put("/todos/:id", authenticateJWT, TodoController.updateTodo); 

//soft delete
router.delete("/todos/:id", authenticateJWT, TodoController.softDeleteTodo);

export default router;