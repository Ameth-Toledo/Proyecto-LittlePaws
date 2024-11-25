import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entidad, EntidadResponse } from '../../models/entidad';

@Injectable({
  providedIn: 'root',
})
export class EntidadService {
  private apiUrl = 'http://localhost:8000/entidades';

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

  createEntidad(id_user: number, formData: FormData): Observable<any> {
    const headers = this.getHeaders().set('user_id', String(id_user));
    return this.http.post<any>(`${this.apiUrl}/${id_user}/`, formData,{ headers: this.getHeaders() });
  }

  getVeterinarias(): Observable<EntidadResponse[]> {
    return this.http.get<EntidadResponse[]>(`${this.apiUrl}/entidades/`);
  }

  getAdopcionById(entidadId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/entidades/${entidadId}/`, { headers: this.getHeaders() });
  }

  updateAdopcion(entidadId: number, entidadData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${entidadId}/`, entidadData, { headers: this.getHeaders() });
  }

  deleteAdopcion(entidadId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${entidadId}/`,{ headers: this.getHeaders() });
  }
}
