import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Place } from '../place.model';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');

  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.isFetching.set(true);

    const subscription = this.placesService //
      .loadAvailablePlaces() //
      .subscribe({
        next: (places) => this.places.set(places),
        complete: () => this.isFetching.set(false),
        error: (err: Error) => this.error.set(err.message),
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSelectPlace(selectedPlace: Place) {
    const subscription = this.placesService //
      .addPlaceToUserPlaces(selectedPlace) //
      .subscribe({
        next: (response) => console.log(response),
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
