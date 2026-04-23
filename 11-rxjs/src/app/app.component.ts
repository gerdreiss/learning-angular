import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  interval = toSignal(this.interval$, { initialValue: 0 });

  customInterval$ = new Observable((subscriber) => {
    let times = 0;
    const interval = setInterval(() => {
      if (times > 3) {
        clearInterval(interval);
        subscriber.complete();
      } else {
        subscriber.next({ message: 'New value' });
        times++;
      }
    }, 2000);
  });

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
    this.customInterval$.subscribe({
      next: (v) => console.log(v),
      complete: () => console.log('COMPLETED!'),
      error: (err) => console.error(err),
    });
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
