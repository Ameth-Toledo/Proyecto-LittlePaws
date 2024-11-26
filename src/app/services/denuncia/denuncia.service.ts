import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { DenunciaResponse, Denuncias } from '../../models/denuncias';

@Injectable({
  providedIn: 'root',
})
export class DenunciasService {
  private url: string = 'https://littlepawsback.integrador.xyz/denuncias';

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

  getAllDenuncias(): Observable<DenunciaResponse[]> {
    return this.http.get<DenunciaResponse[]>(`${this.url}/denuncias_all/`, {
      headers: this.getHeaders(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  getDenunciaById(denuncia_id: number): Observable<DenunciaResponse> {
    return this.http.get<DenunciaResponse>(`${this.url}/denuncias/${denuncia_id}/`, {
      headers: this.getHeaders(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  createDenuncia(formData: FormData): Observable<any> {
    return this.http.post<any>(this.url, formData, {
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }
  

  updateSeguimiento(denunciaId: number, seguimientoData: any): Observable<any> {
    return this.http.put<any>(`${this.url}/denuncias/${denunciaId}/`, seguimientoData, {
      headers: this.getHeaders(),
    }).pipe(
      tap((response) => console.log('Seguimiento actualizado:', response)),
      catchError(this.handleError)
    );
  }
  
  deleteDenuncia(denuncia_id: number): Observable<any> {
    return this.http.delete(`${this.url}/denuncias/${denuncia_id}/`, {
      headers: this.getHeaders(),
    }).pipe(
      tap(() => console.log('Denuncia eliminada:', denuncia_id)),
      catchError(this.handleError)
    );
  }
  

  private handleError(error: any) {
    let errorMessage = 'Ha ocurrido un error';
    if (error.error && error.error.detail) {
      errorMessage = error.error.detail; 
    }
    console.error('Error en la solicitud:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
