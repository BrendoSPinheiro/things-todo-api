import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.entity';
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

  @Patch(':id/status')
  public updateStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateStatus(id, status);
  }

  @Delete(':id')
  public delete(@Param('id') id: string): void {
    return this.tasksService.delete(id);
  }
}
