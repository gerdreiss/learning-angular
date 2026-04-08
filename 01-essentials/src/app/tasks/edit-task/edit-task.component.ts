import { Component, input, output } from '@angular/core';
import { type Task } from '../task/task.model';

@Component({
  standalone: false,
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
})
export class EditTaskComponent {
  task = input.required<Task>();
  cancel = output<void>();
  submit = output<Task>();

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    this.submit.emit(this.task());
  }
}
