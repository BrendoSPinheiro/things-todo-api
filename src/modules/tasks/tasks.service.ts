import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAll(): Task[] {
    return this.tasks;
  }

  public getOne(id: string): Task {
    const searchedTask = this.tasks.find((task) => task.id === id);

    if (!searchedTask) {
      throw new NotFoundException('Task not found');
    }

    return searchedTask;
  }

  public create(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  public updateStatus(id: string, status: TaskStatus): Task {
    const taskExists = this.tasks.find((task) => task.id === id);

    if (!taskExists) {
      throw new NotFoundException('Task not found');
    }

    taskExists.status = status;

    return taskExists;
  }

  public delete(id: string): void {
    const taskExists = this.tasks.find((task) => task.id === id);

    if (!taskExists) {
      throw new NotFoundException('Task not found');
    }

    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
