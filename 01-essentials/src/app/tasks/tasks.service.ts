import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { DUMMY_TASKS } from './dummy-tasks';
import { type NewTask } from './new-task/new-task';
import { type Task } from './task/task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = DUMMY_TASKS;

  constructor() {
    const tasks = localStorage.getItem('tasks');

    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

  getUserTasks(userId: string) {
    return this.tasks.filter((task) => task.userId === userId);
  }

  addTask(userId: string, task: NewTask) {
    this.tasks.push({
      id: uuidv4(),
      userId: userId,
      title: task.title,
      summary: task.summary,
      dueDate: task.dueDate,
    });
    this.saveTasks();
  }

  updateTask(updated: Task) {
    for (let task of this.tasks) {
      if (task.id === updated.id) {
        task.title = updated.title;
        task.summary = updated.summary;
        task.dueDate = updated.dueDate;
      }
    }
    this.saveTasks();
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
