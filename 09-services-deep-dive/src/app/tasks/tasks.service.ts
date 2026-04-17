import { Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([]);

  addTask(data: { title: string; description: string }) {
    this.tasks.update((old) => [
      ...old,
      { ...data, id: uuidv4(), status: 'OPEN' },
    ]);
  }

  allTasks = this.tasks.asReadonly();
}
