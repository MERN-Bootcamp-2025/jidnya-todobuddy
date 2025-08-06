import { IsEnum, IsOptional, IsString, IsUUID, IsDate } from 'class-validator';
import { TodoStatus, TodoPriority } from '../models/Todo';

export class CreateTodoDto {
    @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(TodoStatus, {
    message: 'Invalid status. Must be one of: todo, in progress, on hold, done, will not do',
  })
  status: TodoStatus;

  @IsOptional()
  @IsEnum(TodoPriority, {
    message: 'Invalid priority. Must be one of: low, medium, high, critical',
  })
  priority: TodoPriority;

  @IsOptional()
  @IsDate()
  expected_completion_at?: Date;

  @IsOptional()
  @IsUUID()
  user_id: string;
}
