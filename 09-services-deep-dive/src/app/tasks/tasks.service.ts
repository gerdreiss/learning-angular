import { inject, Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { LoggingService, LoggingServiceToken } from '../logging.service';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([]);
  private logger = inject(LoggingServiceToken);

  allTasks = this.tasks.asReadonly();

  tasksWithStatus(status: TaskStatus): Task[] {
    return this.tasks().filter((t) => t.status === status);
  }

  addTask(data: { title: string; description: string }) {
    const newTask: Task = { ...data, id: uuidv4(), status: 'OPEN' };
    this.tasks.update((old) => [...old, newTask]);
    this.logger.log('Added task with title ' + data.title);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((ts) =>
      ts.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    );
    this.logger.log('Changed task status to ' + newStatus);
  }
}
