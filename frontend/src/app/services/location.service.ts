import { Injectable } from '@angular/core';
import { LatLngLiteral } from 'leaflet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}

  // Gets the current location's latitude and longitude as an Observable.
  getCurrentLocation(): Observable<LatLngLiteral> {
    return new Observable((observer) => {
      if (!navigator.geolocation) return;

      return navigator.geolocation.getCurrentPosition(
        (pos) => {
          observer.next({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
