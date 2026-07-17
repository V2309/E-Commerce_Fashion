// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private apiUrl = 'http://localhost:3000/api/users';

  
    constructor(private http: HttpClient) {}
  
    register(user: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/register`, user);
    }
  
  
    login(user: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/login`, user).pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
           
          }
        })
      );
    }
    getToken(): string | null {
      return localStorage.getItem('token');
    }

    isLoggedIn(): boolean {
      if (typeof localStorage !== 'undefined') {
        return !!localStorage.getItem('token');
      }
      return false;
    }
}