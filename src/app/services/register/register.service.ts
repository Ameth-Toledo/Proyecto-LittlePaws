import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserOut, LoginResponse, UserCreate } from '../../models/users';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private url: string = 'https://littlepawsback.integrador.xyz/users/';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('access_token') || localStorage.getItem('access_token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  getUser(): Observable<UserOut[]> {
    const urlApi = `${this.url}/listUsers/`;  
    return this.http.get<UserOut[]>(urlApi, { headers: this.getHeaders() });
  }

  getUserById(user_id: number): Observable<UserOut> {
    const urlApi = `https://littlepawsback.integrador.xyz/users/users/${user_id}`;
    return this.http.get<UserOut>(urlApi, { headers: this.getHeaders() });
  }

  login(loginRequest: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}login/`, loginRequest).pipe(
      tap((response) => {
        const expirationTime = 30 * 60 * 1000;  
        const now = new Date().getTime();

        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('user_id', response.id_user.toString());
        localStorage.setItem('username', response.name);
        localStorage.setItem('lastname', response.lastName);
        localStorage.setItem('email', response.email);
        localStorage.setItem('id_entidad', response.id_entidad?.toString() || 'null');
        localStorage.setItem('tokenExpiration', (now + expirationTime).toString()); 
        
        console.log('Token guardado:', response.access_token); 
      }),
      catchError((error) => {
        console.error('Error en login:', error);
        throw error;
      })
    );
  
}

  updateUser(userId: number, userData: UserCreate): Observable<UserOut> {
  return this.http.put<UserOut>(`${this.url}users/${userId}`, userData, { headers: this.getHeaders() } );
  }


  getAuthToken() {
    return localStorage.getItem('access_token') || ''; 
  }

  addUser(user: UserCreate): Observable<any> {
    return this.http.post(`${this.url}register`, user);
  }

  validateToken(): Observable<boolean> {
    return this.http
      .get<{ valid: boolean }>(`${this.url}validate-token`, { headers: this.getHeaders() })
      .pipe(
        map((response) => response.valid),
        catchError((error) => {
          console.error('Error al validar el token:', error);
          return [false]; 
        })
      );
  }

  isTokenExpired(): boolean {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (tokenExpiration) {
      const currentTime = new Date().getTime();
      return currentTime > parseInt(tokenExpiration);
    }
    return true;
  }
  
  logout() {
    sessionStorage.clear();
    localStorage.clear();
  } 
}
