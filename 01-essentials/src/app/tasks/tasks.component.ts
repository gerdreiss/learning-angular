import { Component, inject, input } from '@angular/core';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { type NewTask } from './new-task/new-task';
import { NewTaskComponent } from './new-task/new-task.component';
import { TaskComponent } from './task/task.component';
import { type Task } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent, EditTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  userId = input.required<string>();
  userName = input.required<string>();
  isAddingTask = false;
  editedTask?: Task;

  private tasksService = inject(TasksService);

  // this is another way to inject the tasks service
  // constructor(private tasksService: TasksService) {}

  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId());
  }

  onTaskComplete(taskId: string) {
    this.tasksService.removeTask(taskId);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCancelAddTask() {
    this.isAddingTask = false;
  }

  onCreateTask(task: NewTask) {
    this.tasksService.addTask(this.userId(), task);
    this.isAddingTask = false;
  }

  onStartEditTask(task: Task) {
    this.editedTask = task;
  }

  onCancelEditTask() {
    this.editedTask = undefined;
  }

  onUpdateTask(updated: Task) {
    this.tasksService.updateTask(updated);
    this.editedTask = undefined;
  }
}
