import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  interval = toSignal(this.interval$);

  private destroyRef = inject(DestroyRef);

  constructor() {
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times.`);
    // });
  }

  ngOnInit(): void {
    // const subscription = interval(1000)
    //   .pipe(map((v) => v * 2))
    //   .subscribe({
    //     next: (v) => console.log(v),
    //     complete: () => console.log('completed'),
    //     error: (err) => console.log(err),
    //   });
    const subscription = this.clickCount$ //
      .pipe(map((v) => v * 2)) //
      .subscribe({
        next: (v) => console.log(`Clicked button ${v} times.`),
        complete: () => console.log('completed'),
        error: (err) => console.log(err),
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onClick() {
    this.clickCount.update((v) => v + 1);
  }
}
