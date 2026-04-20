import { Component, computed, inject, signal } from '@angular/core';
import {
  TaskStatusOptionsProvider,
  TaskStatusOptionsToken,
} from '../task.model';
import { TasksService } from '../tasks.service';
import { TaskItemComponent } from './task-item/task-item.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [TaskStatusOptionsProvider],
})
export class TasksListComponent {
  private tasksService = inject(TasksService);
  private selectedFilter = signal<string>('all');

  taskStatusOptions = inject(TaskStatusOptionsToken);

  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'open':
        return this.tasksService.tasksWithStatus('OPEN');
      case 'in-progress':
        return this.tasksService.tasksWithStatus('IN_PROGRESS');
      case 'done':
        return this.tasksService.tasksWithStatus('DONE');
      default:
        return this.tasksService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
