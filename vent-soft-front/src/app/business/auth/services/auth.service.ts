import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../../enviroments/enviroment';
import { LoginRequestDTO } from '../loginRequest.dto';
import { JwtResponseDTO } from '../jwtResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private rolesSubject = new BehaviorSubject<string[]>([]);
  private loginSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const login = localStorage.getItem('login');
      if (token) {
        this.tokenSubject.next(token);
        this.setRolesFromToken(token);
      }
      this.loginSubject.next(login);
    }
  }

  login(credentials: LoginRequestDTO): Observable<JwtResponseDTO> {
    return this.http.post<JwtResponseDTO>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        const token = response.payload.token;
        const login = response.payload.login;
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', token);
          localStorage.setItem('login', login);
        }
        this.tokenSubject.next(token);
        this.loginSubject.next(login);
        this.setRolesFromToken(token);
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('login');
    }
    this.tokenSubject.next(null);
    this.loginSubject.next(null);
    this.rolesSubject.next([]);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getRoles(): string[] {
    return this.rolesSubject.value;
  }

  getLogin(): Observable<string | null> {
    return this.loginSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  // Método opcional para verificar la caducidad en el frontend (como optimización)
  isTokenValid(token: string): boolean {
    if (!token || typeof token !== 'string') {
      return false;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(parts[1]));
      const exp = payload.exp;
      if (!exp) {
        return false;
      }

      const now = Math.floor(Date.now() / 1000);
      return now < exp;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }

  private setRolesFromToken(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const roles = payload.roles.map((r: { authority: string }) => r.authority);
      this.rolesSubject.next(roles);
    } catch (error) {
      console.error('Error decoding token:', error);
      this.rolesSubject.next([]);
    }
  }
}