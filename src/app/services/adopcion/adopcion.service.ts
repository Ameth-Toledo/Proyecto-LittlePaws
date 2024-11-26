import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdopcionService {
  private apiUrl = 'http://localhost:8000/adopciones'; 

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('access_token') || localStorage.getItem('access_token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  constructor(private http: HttpClient) { }

  createAdopcion(data: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, data, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getAllAdopciones(entityId: number): Observable<any> {
    const params = new HttpParams().set('id_entidad', entityId.toString());
    return this.http.get<any>(`${this.apiUrl}/all/`, { headers: this.getHeaders(), params: params }).pipe(
      catchError(this.handleError)
    );
  }

  getAdopcionById(adopcionId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${adopcionId}/`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  updateAdopcion(adopcionId: number, idStatus: string): Observable<any> {
    const formData = new FormData();
    formData.append('id_status', idStatus);
    return this.http.put<any>(`${this.apiUrl}/${adopcionId}/update_status/`, formData, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  deleteAdopcion(adopcionId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${adopcionId}/`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    const errorMessage = error?.error?.detail || 'Ha ocurrido un error inesperado';
    console.error('Error en el servicio:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
