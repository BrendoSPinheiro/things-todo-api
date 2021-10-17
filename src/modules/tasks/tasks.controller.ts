import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  public index(): Task[] {
    return this.tasksService.getAll();
  }

  @Get(':id')
  public show(@Param('id') id: string): Task {
    return this.tasksService.getOne(id);
  }

  @Post()
  public store(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }
}
