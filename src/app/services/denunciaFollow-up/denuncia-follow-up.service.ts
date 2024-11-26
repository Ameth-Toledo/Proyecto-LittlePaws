import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DenunciaSeguimientoRequest, DenunciaSeguimientoResponse } from '../../models/denuncia-seguimiento-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DenunciaFollowUpService {
  private apiUrl = 'https://littlepawsback.integrador.xyz/denuncias_seguimiento/'; 

  constructor(private http: HttpClient) {}

  createSeguimiento(seguimiento: DenunciaSeguimientoRequest): Observable<DenunciaSeguimientoResponse> {
    return this.http.post<DenunciaSeguimientoResponse>(this.apiUrl, seguimiento);
  }

  getSeguimientosByDenuncia(denunciaId: number): Observable<DenunciaSeguimientoResponse[]> {
    return this.http.get<DenunciaSeguimientoResponse[]>(`${this.apiUrl}${denunciaId}/`);
  }


  getAllSeguimientos(): Observable<DenunciaSeguimientoResponse[]> {
    return this.http.get<DenunciaSeguimientoResponse[]>(`${this.apiUrl}/all/`);
  }

  
  updateSeguimiento(seguimientoId: number, seguimiento: DenunciaSeguimientoRequest): Observable<DenunciaSeguimientoResponse> {
    return this.http.put<DenunciaSeguimientoResponse>(`${this.apiUrl}${seguimientoId}/`, seguimiento);
  }


  deleteSeguimiento(seguimientoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${seguimientoId}/`);
  }
}