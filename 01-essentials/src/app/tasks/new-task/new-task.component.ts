import { Component, output, signal } from '@angular/core';
import { type NewTask } from './new-task';

@Component({
  standalone: false,
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  cancel = output<void>();
  submit = output<NewTask>();

  title = signal('');
  summary = signal('');
  dueDate = signal('');

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    this.submit.emit({
      title: this.title(),
      summary: this.summary(),
      dueDate: this.dueDate(),
    });
  }
}
