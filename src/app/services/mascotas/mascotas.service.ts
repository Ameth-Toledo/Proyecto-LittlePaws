import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { PetsRequest, PetsResponse } from '../../models/pets';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  private url: string = 'http://127.0.0.1:8000/mascotas';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token') || ''; 
    if (!token) {
      throw new Error('Token no encontrado');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, 
    });
  }

  getAllMascotas(): Observable<PetsResponse[]> {
    return this.http.get<PetsResponse[]>(`${this.url}/mascotas_all/`, {
      headers: this.getHeaders(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  
  getMascotaById(id: number): Observable<PetsResponse> {
    return this.http.get<PetsResponse>(`${this.url}/${id}/`, {
      headers: this.getHeaders(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  createMascota(formData: FormData): Observable<PetsRequest> {
    console.log('Enviando solicitud de adopción con los siguientes datos:', formData);
    return this.http.post<PetsRequest>(this.url, formData);
  }


  updateMascota(id: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}/`, formData, {
      headers: this.getHeaders(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteMascota(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}/`, {
      headers: this.getHeaders(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    const errorMessage = error?.error?.detail || 'Ha ocurrido un error inesperado';
    console.error('Error en el servicio:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}