import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MascotasExtraviadas } from '../../models/mascotas-extraviadas';

@Injectable({
  providedIn: 'root'
})
export class MascotasExtraviadasService {
  private apiUrl = 'http://127.0.0.1:8000/mascotas-extraviadas'; 

  constructor(private http: HttpClient) {}


  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token') || '';
    if (!token) {
      throw new Error('Token no encontrado');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  createMascotaExtraviada(formData: FormData): Observable<MascotasExtraviadas> {
    console.log('Enviando datos para crear mascota extraviada:', formData);
    return this.http.post<MascotasExtraviadas>(this.apiUrl, formData, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }


  getMascotasExtraviadas(): Observable<MascotasExtraviadas[]> {
    return this.http.get<MascotasExtraviadas[]>(this.apiUrl, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }


  getMascotaExtraviadaById(id: number): Observable<MascotasExtraviadas> {
    return this.http.get<MascotasExtraviadas>(`${this.apiUrl}/${id}/`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateMascotaExtraviada(id: number, formData: FormData): Observable<MascotasExtraviadas> {
    return this.http.put<MascotasExtraviadas>(`${this.apiUrl}/${id}/`, formData, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteMascotaExtraviada(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`, {
      headers: this.getHeaders()
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
