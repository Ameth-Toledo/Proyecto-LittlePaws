import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { DenunciaResponse, Denuncias } from '../../models/denuncias';

@Injectable({
  providedIn: 'root'
})
export class DenunciasService {

  private url: string = 'http://127.0.0.1:8000/denuncias';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllDenuncias(): Observable<DenunciaResponse[]> {
    const urlApi = `${this.url}/denuncias_all/`;
    console.log(urlApi);
    return this.http.get<DenunciaResponse[]>(urlApi, { headers: this.getHeaders() });
  }

  getDenunciaById(denuncia_id: number): Observable<DenunciaResponse> {
    const urlApi = `${this.url}/denuncias/${denuncia_id}/`;
    console.log(urlApi);
    return this.http.get<DenunciaResponse>(urlApi, { headers: this.getHeaders() });
  }

  createDenuncia(formData: FormData): Observable<any> {
    return this.http.post<any>(this.url, formData);
  }

  updateDenuncia(denuncia_id: number, denunciaRequest: Denuncias): Observable<DenunciaResponse> {
    const urlApi = `${this.url}/denuncias/${denuncia_id}/`;
    return this.http.put<DenunciaResponse>(urlApi, denunciaRequest, { headers: this.getHeaders() }).pipe(
      tap((response) => {
        console.log('Denuncia actualizada:', response);
      }),
      catchError((error) => {
        console.error('Error al actualizar denuncia:', error);
        throw error;
      })
    );
  }

  deleteDenuncia(denuncia_id: number): Observable<any> {
    const urlApi = `${this.url}/denuncias/${denuncia_id}/`;
    return this.http.delete(urlApi, { headers: this.getHeaders() }).pipe(
      tap(() => {
        console.log('Denuncia eliminada:', denuncia_id);
      }),
      catchError((error) => {
        console.error('Error al eliminar denuncia:', error);
        throw error;
      })
    );
  }

  getAuthToken() {
    return localStorage.getItem('access_token') || '';
  }
}
