import { Injectable } from '@nestjs/common';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAll(): Task[] {
    return this.tasks;
  }
}
