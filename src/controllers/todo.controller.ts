import { Request, Response } from "express";
import { CreateTodoDto } from "../dtos/todo.dto";
import { TodoService } from "../services/todo.services";

export class TodoController {
  static todoService = new TodoService();

  //POST
  static async createTodo(req: Request, res: Response) {
    try {
      const dto: CreateTodoDto = req.body;
      const create = await TodoController.todoService.createTodo(dto);
      return res.status(201).json(create);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error creating todo", error });
    }
  }

  //GET all
  static async getTodos(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const {
        page = 1,
        limit = 10,
        status,
        priority,
        title,
        from_date,
        to_date,
      } = req.query;

      const result = await TodoController.todoService.getTodos(userId, {
        page: Number(page),
        limit: Number(limit),
        status: status as string,
        priority: priority as string,
        title: title as string,
        from_date: from_date as string,
        to_date: to_date as string,
      });

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to fetch todos", error });
    }
  }

  //GET by id
  static async getTodoById(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const todoId = req.params.id;

      const todo = await TodoController.todoService.getTodoById(userId, todoId);
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      return res.status(200).json(todo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to fetch todo", error });
    }
  }

  //PUT
  static async updateTodo(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const todoId = req.params.id;
      const dto: CreateTodoDto = req.body;

      const updated = await TodoController.todoService.updateTodo(
        userId,
        todoId,
        dto
      );

      if (!updated) {
        return res
          .status(404)
          .json({ message: "Todo not found" });
      }

      return res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to update todo", error });
    }
  }

  //PATCH
  static async patchTodo(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const todoId = req.params.id;
      const dto: Partial<CreateTodoDto> = req.body;

      const updatedTodo = await TodoController.todoService.updatePartialTodo(
        userId,
        todoId,
        dto
      );

      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      return res.status(200).json(updatedTodo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to update todo", error });
    }
  }

  //DELETE
  static async softDeleteTodo(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const todoId = req.params.id;

      const deleted = await TodoController.todoService.softDeleteTodo(
        userId,
        todoId
      );

      if (!deleted) {
        return res
          .status(404)
          .json({ message: "Todo not found or already deleted" });
      }

      return res
        .status(200)
        .json({ message: "Todo soft deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to delete todo", error });
    }
  }
}
