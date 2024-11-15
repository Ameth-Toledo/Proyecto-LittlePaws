import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserOut ,LoginResponse, UserCreate } from '../../models/users';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private url: string = 'http://127.0.0.1:8000/users/';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Corregido: Usa backticks ` para plantilla de cadena
    });
  }

  getUser(): Observable<UserOut[]> {
    const urlApi = `${this.url}/listUsers/`;  // Corregido: Usa backticks ` para plantilla de cadena
    console.log(urlApi);
    return this.http.get<UserOut[]>(urlApi, { headers: this.getHeaders() });
  }

  getCarById(user_id: number): Observable<UserOut> {
    const urlApi = `${this.url}/cars/${user_id}`;  
    console.log(urlApi);
    return this.http.get<UserOut>(urlApi, { headers: this.getHeaders() });
  }

  login(loginRequest: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}login/`, loginRequest).pipe(
      tap((response) => {
        console.log('Token:', response. access_token); 
        localStorage.setItem('access_token', response. access_token); 
        localStorage.setItem('user_id', response.id_user.toString()); 
        localStorage.setItem('username', response. name); 
        localStorage.setItem('lastname', response.lastName); 
        localStorage.setItem('email', response.email); 
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
  
  addUser(user: UserCreate): Observable<any> {
    return this.http.post(`${this.url}registrer`, user);
  }

}
