import { AppDataSource } from "../config/database";
import { CreateTodoDto } from "../dtos/todo.dto";
import { Todo } from "../models/Todo";

export class TodoService{
    private todoRepo = AppDataSource.getRepository(Todo);
    public async createTodo(dto: CreateTodoDto): Promise<Todo> {
        try{
            const todo = this.todoRepo.create(dto);
            return await this.todoRepo.save(todo);
        }catch(error){
            throw new Error("Failed to create todo: : ${error instanceof Error ? error.message : 'Unknown error'}");
        }
    }
}