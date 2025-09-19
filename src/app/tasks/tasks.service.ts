import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Task } from '../shared/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly apiUrl = `${environment.apiUrl}/tasks`;
  private readonly tasksSubject = new BehaviorSubject<Task[]>([]);

  readonly tasks$ = this.tasksSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  loadTasks(): void {
    this.http
      .get<Task[]>(this.apiUrl)
      .pipe(
        tap((tasks) => this.tasksSubject.next(tasks)),
        catchError((error) => {
          console.error('Failed to load tasks', error);
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      tap((created) => this.tasksSubject.next([...this.tasksSubject.value, created])),
    );
  }

  updateTask(task: Task): Observable<Task> {
    if (!task.id) {
      return throwError(() => new Error('Task identifier is missing'));
    }

    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task).pipe(
      tap((updated) => {
        const tasks = this.tasksSubject.value.map((item) => (item.id === updated.id ? updated : item));
        this.tasksSubject.next(tasks);
      }),
    );
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`).pipe(
      tap(() => {
        this.tasksSubject.next(this.tasksSubject.value.filter((task) => task.id !== taskId));
      }),
    );
  }
}
