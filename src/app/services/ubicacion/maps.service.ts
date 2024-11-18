import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private apiKey = 'AIzaSyBrKUxhwk3a8IKWM4L9QfJSvjBkFcpmwzI'


  constructor(private httpClient: HttpClient) { }


  getPlaceLocation(query: string): Observable<any> {
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=geometry&key=${this.apiKey}`;
    return this.httpClient.get(url);
  }
}

