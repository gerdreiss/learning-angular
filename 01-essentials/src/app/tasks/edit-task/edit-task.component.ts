import {
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  Signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type Task } from '../task/task.model';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule],
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
