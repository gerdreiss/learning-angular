import { Component, input, output } from '@angular/core';
import { type Task } from './task.model';

@Component({
  standalone: false,
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  task = input.required<Task>();
  edit = output<Task>();
  complete = output<string>();

  onTaskEdit() {
    this.edit.emit(this.task());
  }

  onTaskComplete() {
    this.complete.emit(this.task().id);
  }
}
