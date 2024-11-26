import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { Comentarios, ComentarioResponse } from '../../models/comentarios';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private url: string = 'https://littlepawsback.integrador.xyz/comments';  

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllComentarios(): Observable<ComentarioResponse[]> {
    return this.http.get<ComentarioResponse[]>(`${this.url}/all`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getComentariosById(comment_id: string): Observable<ComentarioResponse> {
    const urlApi = `${this.url}/${comment_id}`;
    return this.http.get<ComentarioResponse>(urlApi, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  createComentario(comentarioRequest: Comentarios): Observable<ComentarioResponse> {
    return this.http.post<ComentarioResponse>(this.url, comentarioRequest, { headers: this.getHeaders() }).pipe(
      tap((response) => {
        console.log('Comentario creado:', response);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;  
  }

  getAuthToken() {
    return localStorage.getItem('access_token') || '';
  }
}
