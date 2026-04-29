import { Component, computed, inject, input } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';
import { User } from '../user/user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent /*implements OnInit*/ {
  message = input.required<string>(); // this comes from the data config in the routes config
  userId = input.required<string>(); // <-- this comes from the dynamic routes path parameter :userId
  userName = input.required<string>(); // this comes from the function below the class via the `resolve` route config

  // private usersService = inject(UsersService);
  // user = computed(() =>
  //   this.usersService.users.find((u) => u.id === this.userId()),
  // );
  // private activatedRouteService = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);
  // user = signal<User | undefined>(undefined);
  // ngOnInit(): void {
  //   const subscription = this.activatedRouteService.paramMap.subscribe({
  //     next: (paramMap) =>
  //       this.user.set(
  //         this.usersService.users //
  //           .find((u) => u.id === paramMap.get('userId')),
  //       ),
  //   });
  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  // }
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot,
) => {
  const usersService = inject(UsersService);
  const userName =
    usersService.users.find((u) => u.id === activatedRoute.paramMap.get('userId'))
      ?.name || '';
  return userName;
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot,
) => {
  return resolveUserName(activatedRoute, routerState) + "'s Tasks";
};
