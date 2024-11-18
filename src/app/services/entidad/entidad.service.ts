import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {
  private apiUrl = 'http://localhost:8000/entidades'; 

  constructor(private http: HttpClient) { }

  createEntidad(id_user: number, formData: FormData): Observable<any> {
    const headers = new HttpHeaders().set('user_id', String(id_user)); 

    return this.http.post<any>(`${this.apiUrl}/${id_user}/`, formData, { headers });
  }

  getAdopciones(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all/`);
  }

  getAdopcionById(adopcionId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${adopcionId}/`);
  }

  updateAdopcion(adopcionId: number, adopcionData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${adopcionId}/`, adopcionData);
  }

  deleteAdopcion(adopcionId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${adopcionId}/`);
  }
}
