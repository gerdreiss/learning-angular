import { Component, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';

@Component({
    selector: 'app-tasks-list',
    templateUrl: './tasks-list.component.html',
    styleUrl: './tasks-list.component.css',
    imports: [TaskItemComponent]
})
export class TasksListComponent {
  selectedFilter = signal<string>('all');
  tasks = [];

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
