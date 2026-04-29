import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveTitle,
  resolveUserName,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { routes as userRoutes } from './users/users.routes';
import { inject } from '@angular/core';

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  return Math.random() > 0.1 ? true : new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const routes: Routes = [
  { path: '', component: NoTaskComponent, title: 'No task selected' },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userRoutes,
    canMatch: [dummyCanMatch],
    data: { message: 'hello' }, // static data
    runGuardsAndResolvers: 'always',
    resolve: { userName: resolveUserName },
    title: resolveTitle,
  },
  { path: '**', component: NotFoundComponent },
];
