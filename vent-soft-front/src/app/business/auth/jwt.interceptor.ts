import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next): Observable<any> => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};