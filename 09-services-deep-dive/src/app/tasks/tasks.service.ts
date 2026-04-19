import { Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([]);

  allTasks = this.tasks.asReadonly();

  tasksWithStatus(status: TaskStatus): Task[] {
    return this.tasks().filter((t) => t.status === status);
  }

  addTask(data: { title: string; description: string }) {
    this.tasks.update((old) => [
      ...old,
      { ...data, id: uuidv4(), status: 'OPEN' },
    ]);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((ts) =>
      ts.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    );
  }
}
