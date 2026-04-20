import { InjectionToken, Provider } from '@angular/core';

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export type TaskStatusOption = {
  value: 'open' | 'in-progress' | 'done';
  status: TaskStatus;
  text: 'Open' | 'In Progress' | 'Completed';
};

export const TaskStatusOptions: TaskStatusOption[] = [
  {
    value: 'open',
    status: 'OPEN',
    text: 'Open',
  },
  {
    value: 'in-progress',
    status: 'IN_PROGRESS',
    text: 'In Progress',
  },
  {
    value: 'done',
    status: 'DONE',
    text: 'Completed',
  },
];

export const TaskStatusOptionsToken = new InjectionToken<TaskStatusOption[]>(
  'tasks-status-options-token',
);

export const TaskStatusOptionsProvider: Provider = {
  provide: TaskStatusOptionsToken,
  useValue: TaskStatusOptions,
};

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
