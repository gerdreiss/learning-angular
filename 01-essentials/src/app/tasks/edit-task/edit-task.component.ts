import { Component, computed, input, output, Signal } from '@angular/core';
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

  title: Signal<string> = computed(() => this.task().title);
  summary: Signal<string> = computed(() => this.task().summary);
  dueDate: Signal<string> = computed(() => this.task().dueDate);

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    this.submit.emit({
      id: this.task()!.id,
      userId: this.task()!.userId,
      title: this.title(),
      summary: this.summary(),
      dueDate: this.dueDate(),
    });
  }
}
