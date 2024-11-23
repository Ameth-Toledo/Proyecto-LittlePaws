import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.post<any>(this.apiUrl, data, { headers: this.getHeaders() });
  }
  
  getAdopciones(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all/`, { headers: this.getHeaders() });
  }

  getAdopcionById(adopcionId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${adopcionId}/`,{ headers: this.getHeaders() });
  }

  updateAdopcion(adopcionId: number, idStatus: string): Observable<any> {
    const formData = new FormData();
    formData.append('id_status', idStatus);  
    return this.http.put<any>(`${this.apiUrl}/${adopcionId}/update_status/`, formData, { headers: this.getHeaders() });
  }
  
  
  deleteAdopcion(adopcionId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${adopcionId}/`, { headers: this.getHeaders() });
  }
}
