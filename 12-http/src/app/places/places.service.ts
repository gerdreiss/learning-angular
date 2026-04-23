import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces(): Observable<Place[]> {
    return this.fetchPlaces('http://localhost:3000/places');
  }

  loadUserPlaces(): Observable<Place[]> {
    return this.fetchPlaces('http://localhost:3000/user-places') //
      .pipe(
        tap({
          next: (places) => this.userPlaces.set(places),
        }),
      );
  }

  addPlaceToUserPlaces(place: Place): Observable<Object> {
    this.userPlaces.update((places) => [...places, place]);

    return this.httpClient.put('http://localhost:3000/user-places', {
      placeId: place.id,
    });
  }

  removeUserPlace(placeId: string) {
    this.httpClient.delete('http://localhost:3000/user-places/' + placeId);
  }

  private fetchPlaces(url: string): Observable<Place[]> {
    return this.httpClient //
      .get<{ places: Place[] }>(url) //
      .pipe(
        map((data) => data.places),
        catchError((error) =>
          throwError(() => new Error('Something went wrong...')),
        ),
      );
  }
}
