import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdopcionService {

  private apiUrl = 'http://localhost:8000/adopciones'; 

  constructor(private http: HttpClient) { }

  createAdopcion(data: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  getAdopciones(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all/`);
  }

  getAdopcionById(adopcionId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${adopcionId}/`);
  }

  updateAdopcion(adopcionId: number, adopcionData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${adopcionId}/`, adopcionData);
  }

  deleteAdopcion(adopcionId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${adopcionId}/`);
  }
}
