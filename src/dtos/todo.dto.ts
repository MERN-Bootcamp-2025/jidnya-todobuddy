import { IsEnum, IsOptional, IsString, IsUUID, IsDate } from 'class-validator';
import { TodoStatus, TodoPriority } from '../models/Todo';

export class CreateTodoDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(TodoStatus, {
    message: 'Invalid status. Must be one of: todo, in progress, on hold, done, will not do',
  })
  status: TodoStatus;

  @IsEnum(TodoPriority, {
    message: 'Invalid priority. Must be one of: low, medium, high, critical',
  })
  priority: TodoPriority;

  @IsOptional()
  @IsDate()
  expected_completion_at?: Date;

  @IsUUID()
  user_id: string;
}
