import { Component, input, output } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { type Task } from './task.model';

@Component({
    selector: 'app-task',
    imports: [CardComponent],
    templateUrl: './task.component.html',
    styleUrl: './task.component.css'
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
