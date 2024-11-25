import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DenunciasComentariosRequest, DenunciasComentariosResponse } from '../../models/denuncias-comentarios-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DenunciaCommentsService {
  private apiUrl = 'http://localhost:8000/comentarios/';

  constructor(private http: HttpClient) {}

  createComentario(comentario: DenunciasComentariosRequest): Observable<DenunciasComentariosResponse> {
    return this.http.post<DenunciasComentariosResponse>(this.apiUrl, comentario);
  }


  getComentariosByDenuncia(denunciaId: number): Observable<DenunciasComentariosResponse[]> {
    return this.http.get<DenunciasComentariosResponse[]>(`${this.apiUrl}${denunciaId}/`);
  }


  getAllComentarios(): Observable<DenunciasComentariosResponse[]> {
    return this.http.get<DenunciasComentariosResponse[]>(`${this.apiUrl}/all/`);
  }

  updateComentario(comentarioId: number, comentario: DenunciasComentariosRequest): Observable<DenunciasComentariosResponse> {
    return this.http.put<DenunciasComentariosResponse>(`${this.apiUrl}${comentarioId}/`, comentario);
  }


  deleteComentario(comentarioId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${comentarioId}/`);
  }
}
