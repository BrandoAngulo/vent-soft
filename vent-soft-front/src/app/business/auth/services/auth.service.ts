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

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      this.tokenSubject.next(token);
      if (token) {
        this.setRolesFromToken(token);
      }
    }
  }

  login(credentials: LoginRequestDTO): Observable<JwtResponseDTO> {
    return this.http.post<JwtResponseDTO>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        const token = response.payload.token; // Acceder al token dentro de payload
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', token);
        }
        this.tokenSubject.next(token);
        this.setRolesFromToken(token);
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.tokenSubject.next(null);
    this.rolesSubject.next([]);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getRoles(): string[] {
    return this.rolesSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

    if (!token || typeof token !== 'string') {
      return false;
    }
    const parts = token.split('.');
    return parts.length === 3; // Un JWT válido debe tener 3 partes (header, payload, signature)
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
