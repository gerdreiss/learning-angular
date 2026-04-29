import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  private tasksService = inject(TasksService);

  order = input<'asc' | 'desc'>('desc');
  userId = input.required<string>();
  userTasks = computed(() =>
    this.tasksService
      .allTasks()
      .filter((t) => t.userId === this.userId())
      .sort((a, b) => {
        if (this.order() === 'desc') {
          return a.id > b.id ? -1 : 1;
        } else {
          return a.id > b.id ? 1 : -1;
        }
      }),
  );

  // private activatedroute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);
  // ngOnInit() {
  //   const sub = this.activatedroute.queryParams.subscribe({
  //     next: (params) => this.order.set(params['order']),
  //   });
  //   this.destroyRef.onDestroy(() => sub.unsubscribe());
  // }
}
