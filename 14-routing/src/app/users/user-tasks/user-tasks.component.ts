import { Component, computed, inject, input } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent /*implements OnInit*/ {
  private usersService = inject(UsersService);

  userId = input.required<string>(); // <-- this comes from the dynamic routes path parameter :userId
  user = computed(() =>
    this.usersService.users.find((u) => u.id === this.userId()),
  );

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
