import { Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    imports: [NewTaskComponent, TasksListComponent]
})
export class TasksComponent {}
