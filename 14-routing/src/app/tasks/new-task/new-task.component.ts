import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CanDeactivateFn, Router, RouterLink } from '@angular/router';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  submitted = false;

  private tasksService = inject(TasksService);
  private router = inject(Router);

  confirmLeave() {
    return !this.submitted && (this.enteredTitle() || this.enteredDate() || this.enteredSummary());
  }

  onSubmit() {
    const newTask = {
      title: this.enteredTitle(),
      summary: this.enteredSummary(),
      date: this.enteredDate(),
    };
    this.tasksService.addTask(newTask, this.userId());
    this.submitted = true;
    this.router.navigate(['/users', this.userId(), 'tasks'], { replaceUrl: true });
  }
}

export const canLeavePage: CanDeactivateFn<NewTaskComponent> = (component) => {
  return component.confirmLeave() ? window.confirm('Do you really want to leave?') : true;
};
