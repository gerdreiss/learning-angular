import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-user-places',
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);

  userPlaces = this.placesService.loadedUserPlaces;
  isFetching = signal(false);
  error = signal('');

  ngOnInit(): void {
    this.isFetching.set(true);

    const subscription = this.placesService //
      .loadUserPlaces() //
      .subscribe({
        complete: () => this.isFetching.set(false),
        error: (err: Error) => this.error.set(err.message),
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSelectPlace(place: Place) {
    const subscription = this.placesService //
      .removeUserPlace(place.id)
      .subscribe({
        error: (err: Error) => this.error.set(err.message),
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
