import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAll(): Task[] {
    return this.tasks;
  }

  public getAllWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let filteredTasks: Task[] = this.getAll();

    if (status) {
      filteredTasks = filteredTasks.filter((task) => task.status === status);
    }

    if (search) {
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search),
      );
    }

    return filteredTasks;
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
    const task = this.getOne(id);

    task.status = status;

    return task;
  }

  public delete(id: string): void {
    const foundTask = this.getOne(id);

    this.tasks = this.tasks.filter((task) => task.id !== foundTask.id);
  }
}
