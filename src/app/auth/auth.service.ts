import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'task_manager_token';
  private readonly authState$ = new BehaviorSubject<boolean>(this.hasToken());

  readonly isAuthenticated$ = this.authState$.asObservable();

  login({ email, password }: Credentials): Observable<string> {
    if (!email || !password) {
      return throwError(() => new Error('Invalid credentials'));
    }

    const token = `mock-jwt-${btoa(email)}-${Date.now()}`;
    return of(token).pipe(
      delay(600),
      tap((value) => {
        localStorage.setItem(this.tokenKey, value);
        this.authState$.next(true);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.authState$.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return this.authState$.value;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
