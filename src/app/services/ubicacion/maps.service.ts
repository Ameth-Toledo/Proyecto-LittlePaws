import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve(position);
          },
          error => {
            reject(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0 
          }
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }
}
