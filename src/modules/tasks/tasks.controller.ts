import { Controller, Get } from '@nestjs/common';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  public index(): Task[] {
    return this.tasksService.getAll();
  }
}
