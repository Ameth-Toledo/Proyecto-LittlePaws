import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { Comentarios, ComentarioResponse } from '../../models/comentarios';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private url : string = 'http://localhost:3002/comentarios'

  constructor(private http : HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllComentarios(): Observable<ComentarioResponse[]> {
    return this.http.get<ComentarioResponse[]>(this.url, { headers: this.getHeaders() });
  }

  getComentariosById(denuncia_id: number): Observable<ComentarioResponse> {
    const urlApi = `${this.url}/denuncias/${denuncia_id}/`;
    console.log(urlApi);
    return this.http.get<ComentarioResponse>(urlApi, { headers: this.getHeaders() });
  }

  createComentario(comentarioRequest: Comentarios): Observable<ComentarioResponse> {
    return this.http.post<ComentarioResponse>(this.url, comentarioRequest, { headers: this.getHeaders() }).pipe(
      tap((response) => {
        console.log('Comentario creado:', response);
      }),
      catchError((error) => {
        console.error('Error al crear comentario:', error);
        throw error;
      })
    );
  }

  getAuthToken() {
    return localStorage.getItem('access_token') || '';
  }

  getComentarios(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }  
  
}
