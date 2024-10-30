import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users, LoginResponse } from '../../models/users';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'; // Asegúrate de importar estos operadores

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private url: string = 'http://127.0.0.1:8000/register';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Corregido: Usa backticks ` para plantilla de cadena
    });
  }

  getUser(): Observable<Users[]> {
    const urlApi = `${this.url}/listUsers/`;  // Corregido: Usa backticks ` para plantilla de cadena
    console.log(urlApi);
    return this.http.get<Users[]>(urlApi, { headers: this.getHeaders() });
  }

  getCarById(user_id: number): Observable<Users> {
    const urlApi = `${this.url}/cars/${user_id}`;  // Corregido: Usa backticks ` para plantilla de cadena
    console.log(urlApi);
    return this.http.get<Users>(urlApi, { headers: this.getHeaders() });
  }

  login(loginRequest: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/login/`, loginRequest).pipe( // Corregido: Usa backticks ` para plantilla de cadena
      tap((response) => {
        console.log('Token:', response.token); 
        localStorage.setItem('access_token', response.token); 
      }),
      catchError((error) => {
        console.error('Error en login:', error);
        throw error; 
      })
    );
  }

  getAuthToken() {
    return localStorage.getItem('access_token') || ''; 
  }
  
  addUser(registerRequest: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.url}/register/`, registerRequest, { headers: this.getHeaders() }); // Corregido: Usa backticks ` para plantilla de cadena
  }
}
