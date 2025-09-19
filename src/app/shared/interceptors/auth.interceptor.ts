import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AuthService } from '../../auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const snackBar = inject(MatSnackBar);
  const token = authService.getToken();

  const request = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(request).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        const message =
          error.status >= 500
            ? 'Server error. Please try again later.'
            : error.error?.message || 'Request failed. Please try again.';
        snackBar.open(message, 'Close', { duration: 3000 });

        if (error.status === 401) {
          authService.logout();
        }
      }

      return throwError(() => error);
    }),
  );
};
