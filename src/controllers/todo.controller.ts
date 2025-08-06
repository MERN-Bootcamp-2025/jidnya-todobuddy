import { Request, Response } from 'express';
import { CreateTodoDto } from '../dtos/todo.dto';
import { TodoService } from '../services/todo.services';

export class TodoController{
    static todoService = new TodoService();

   static async createTodo(req: Request, res: Response) {
    try {
      const dto: CreateTodoDto = req.body;
      const create = await TodoController.todoService.createTodo(dto); 
      res.status(201).json(create);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating todo', error });
    }
  }
}