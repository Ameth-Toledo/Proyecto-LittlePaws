import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdopcionService {
  private apiUrl = 'https://littlepawsback.integrador.xyz/adopciones'; 

  constructor(private http: HttpClient) { }

  // Método para obtener los encabezados con el token de autorización
  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('access_token') || localStorage.getItem('access_token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  // Obtener todas las adopciones, filtrando por id_entidad o id_usuario
  getAllAdopciones(entityId?: number, userId?: number): Observable<any> {
    let params = new HttpParams();
    if (entityId) params = params.set('id_entidad', entityId.toString());
    if (userId) params = params.set('id_usuario', userId.toString());

    return this.http.get<any>(`${this.apiUrl}/all/`, { headers: this.getHeaders(), params: params }).pipe(
      catchError(this.handleError)
    );
  }
  // Obtener detalles de una adopción específica
  getAdopcionById(adopcionId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${adopcionId}/`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Crear una nueva adopción
  createAdopcion(data: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, data, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar el estado de una adopción
  updateAdopcion(adopcionId: number, idStatus: string): Observable<any> {
    const formData = new FormData();
    formData.append('id_status', idStatus);
    return this.http.put<any>(`${this.apiUrl}/${adopcionId}/update_status/`, formData, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar una adopción
  deleteAdopcion(adopcionId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${adopcionId}/`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores genérico
  private handleError(error: any): Observable<never> {
    const errorMessage = error?.error?.detail || 'Ha ocurrido un error inesperado';
    console.error('Error en el servicio:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
