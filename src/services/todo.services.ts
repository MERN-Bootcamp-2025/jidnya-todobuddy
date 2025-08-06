import { AppDataSource } from "../config/database";
import { CreateTodoDto } from "../dtos/todo.dto";
import { Todo } from "../models/Todo";
import { ILike, Repository, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';

export class TodoService {
  private todoRepo: Repository<Todo> = AppDataSource.getRepository(Todo);

  public async createTodo(dto: CreateTodoDto): Promise<Todo> {
    try {
      const todo = this.todoRepo.create({
        title: dto.title,
        description: dto.description,
        status: dto.status,
        priority: dto.priority,
        expected_completion_at: dto.expected_completion_at || null,
        user_id: dto.user_id,
      });

      return await this.todoRepo.save(todo);
    } catch (error) {
      throw new Error(
        `Failed to create todo: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  public async getTodos(userId: string, query: any) {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        priority,
        title,
        from_date,
        to_date,
      } = query;

      const where: any = {
        user_id: userId,
        is_deleted: false,
      };

      if (status) where.status = status;
      if (priority) where.priority = priority;
      if (title) where.title = ILike(`%${title}%`);

      if (from_date && to_date) {
        where.expected_completion_at = Between(new Date(from_date), new Date(to_date));
      } else if (from_date) {
        where.expected_completion_at = MoreThanOrEqual(new Date(from_date));
      } else if (to_date) {
        where.expected_completion_at = LessThanOrEqual(new Date(to_date));
      }

      const [todos, totalItems] = await this.todoRepo.findAndCount({
        where,
        order: { created_at: 'DESC' },
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        page: Number(page),
        limit: Number(limit),
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        todos,
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch todos: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  public async getTodoById(userId: string, id: string): Promise<Todo | null> {
    try {
      return await this.todoRepo.findOne({
        where: {
          id,
          user_id: userId,
          is_deleted: false,
        },
      });
    } catch (error) {
      throw new Error(
        `Failed to fetch todo by id: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  public async updateTodo(userId: string, todoId: string, dto: CreateTodoDto): Promise<Todo | null> {
    try {
      const todo = await this.todoRepo.findOne({
        where: {
          id: todoId,
          user_id: userId,
          is_deleted: false,
        },
      });

      if (!todo) return null;

      Object.assign(todo, dto);
      return await this.todoRepo.save(todo);
    } catch (error) {
      throw new Error(
        `Failed to update todo: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  public async softDeleteTodo(userId: string, todoId: string): Promise<boolean> {
    try {
      const todo = await this.todoRepo.findOne({
        where: {
          id: todoId,
          user_id: userId,
          is_deleted: false,
        },
      });

      if (!todo) return false;

      todo.is_deleted = true;
      await this.todoRepo.save(todo);
      return true;
    } catch (error) {
      throw new Error(
        `Failed to soft delete todo: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}
