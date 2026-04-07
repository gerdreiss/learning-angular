import { Component, input } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { DUMMY_TASKS } from './dummy-tasks';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { type NewTask } from './new-task/new-task';
import { NewTaskComponent } from './new-task/new-task.component';
import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';

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
  tasks = DUMMY_TASKS;

  get selectedUserTasks() {
    return this.tasks.filter((task) => task.userId === this.userId());
  }

  onTaskComplete(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCancelAddTask() {
    this.isAddingTask = false;
  }

  onCreateTask(task: NewTask) {
    this.tasks.push({
      id: uuidv4(),
      userId: this.userId(),
      title: task.title,
      summary: task.summary,
      dueDate: task.dueDate,
    });
    this.isAddingTask = false;
  }

  onStartEditTask(task: Task) {
    this.editedTask = task;
  }

  onCancelEditTask() {
    this.editedTask = undefined;
  }

  onUpdateTask(updated: Task) {
    for (let task of this.tasks) {
      if (task.id === updated.id) {
        task.title = this.editedTask!.title;
        task.summary = this.editedTask!.summary;
        task.dueDate = this.editedTask!.dueDate;
      }
    }
    this.editedTask = undefined;
  }
}
