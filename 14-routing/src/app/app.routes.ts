import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveTitle,
  resolveUserName,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { routes as userRoutes } from './users/users.routes';

export const routes: Routes = [
  { path: '', component: NoTaskComponent, title: 'No task selected' },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userRoutes,
    data: { message: 'hello' }, // static data
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: { userName: resolveUserName },
    title: resolveTitle,
  },
  { path: '**', component: NotFoundComponent },
];
