import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { Place } from '../place.model';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';

@Component({
  selector: 'app-user-places',
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  userPlaces = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.isFetching.set(true);

    const subscription = this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/user-places')
      .pipe(
        map((data) => data.places),
        catchError((error) =>
          throwError(() => new Error('Something went wrong...')),
        ),
      )
      .subscribe({
        next: (places) => this.userPlaces.set(places),
        complete: () => this.isFetching.set(false),
        error: (err: Error) => this.error.set(err.message),
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
