import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { Adopcion, AdopcionResponse } from '../../models/adopcion';

@Injectable({
  providedIn: 'root'
})
export class AdopcionService {

  private url: string = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  
    });
  }

  getAllAdopciones(): Observable<AdopcionResponse[]> {
    const urlApi = `${this.url}/adopcion/all/`;
    console.log(urlApi);
    return this.http.get<AdopcionResponse[]>(urlApi, { headers: this.getHeaders() });
  }

  getAdopcionById(adopcion_id: number): Observable<AdopcionResponse> {
    const urlApi = `${this.url}/adopcion/${adopcion_id}/`;
    console.log(urlApi);
    return this.http.get<AdopcionResponse>(urlApi, { headers: this.getHeaders() });
  }

  createAdopcion(adopcionRequest: Adopcion): Observable<AdopcionResponse> {
    return this.http.post<AdopcionResponse>(`${this.url}/adopcion/`, adopcionRequest, { headers: this.getHeaders() }).pipe(
      tap((response) => {
        console.log('Nueva adopción creada:', response);
      }),
      catchError((error) => {
        console.error('Error al crear adopción:', error);
        throw error;
      })
    );
  }

  updateAdopcion(adopcion_id: number, adopcionRequest: Adopcion): Observable<AdopcionResponse> {
    const urlApi = `${this.url}/adopcion/${adopcion_id}/`;
    return this.http.put<AdopcionResponse>(urlApi, adopcionRequest, { headers: this.getHeaders() }).pipe(
      tap((response) => {
        console.log('Adopción actualizada:', response);
      }),
      catchError((error) => {
        console.error('Error al actualizar adopción:', error);
        throw error;
      })
    );
  }

  deleteAdopcion(adopcion_id: number): Observable<any> {
    const urlApi = `${this.url}/adopcion/${adopcion_id}/`;
    return this.http.delete(urlApi, { headers: this.getHeaders() }).pipe(
      tap(() => {
        console.log('Adopción eliminada:', adopcion_id);
      }),
      catchError((error) => {
        console.error('Error al eliminar adopción:', error);
        throw error;
      })
    );
  }

  getAuthToken() {
    return localStorage.getItem('access_token') || '';
  }
}


