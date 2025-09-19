import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest, map, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, startWith } from 'rxjs/operators';

import { Task, TaskStatus } from '../../../shared/models/task.model';
import { TaskStatusOption } from '../task-form/task-form.component';
import { TasksService } from '../../tasks.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly columns: { label: string; status: TaskStatus }[] = [
    { label: 'To Do', status: 'todo' },
    { label: 'In Progress', status: 'inProgress' },
    { label: 'Done', status: 'done' },
  ];

  readonly statusOptions: TaskStatusOption[] = this.columns.map((column) => ({
    value: column.status,
    label: column.label,
  }));

  readonly searchControl = new FormControl('', { nonNullable: true });

  readonly board$: Observable<Record<TaskStatus, Task[]>> = combineLatest([
    this.tasksService.tasks$,
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map((value) => value.trim().toLowerCase()),
      filter((value) => value.length === 0 || value.length >= 2),
      distinctUntilChanged(),
    ),
  ]).pipe(map(([tasks, term]) => this.groupTasks(tasks, term)));

  selectedTask: Task | null = null;

  constructor(private readonly tasksService: TasksService, private readonly snackBar: MatSnackBar) {
    this.tasksService.loadTasks();
  }

  trackColumns(_index: number, column: { status: TaskStatus }): TaskStatus {
    return column.status;
  }

  onSave(task: Task): void {
    const action$ = task.id ? this.tasksService.updateTask(task) : this.tasksService.createTask(task);

    action$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.snackBar.open(task.id ? 'Task updated successfully.' : 'Task created successfully.', 'Close', {
            duration: 2500,
          });
          this.selectedTask = null;
        },
        error: () => {
          this.snackBar.open('Unable to save task. Please try again.', 'Close', {
            duration: 3000,
          });
        },
      });
  }

  onEdit(task: Task): void {
    this.selectedTask = task;
  }

  onDelete(task: Task): void {
    if (!task.id) {
      return;
    }

    this.tasksService
      .deleteTask(task.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.snackBar.open('Task deleted.', 'Close', { duration: 2000 });
          if (this.selectedTask?.id === task.id) {
            this.selectedTask = null;
          }
        },
        error: () => this.snackBar.open('Failed to delete task.', 'Close', { duration: 3000 }),
      });
  }

  onStatusChange(event: { task: Task; status: TaskStatus }): void {
    const updated: Task = { ...event.task, status: event.status };
    this.tasksService
      .updateTask(updated)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.snackBar.open('Task status updated.', 'Close', { duration: 2000 }),
        error: () => this.snackBar.open('Unable to update status.', 'Close', { duration: 3000 }),
      });
  }

  resetSearch(): void {
    this.searchControl.setValue('', { emitEvent: true });
  }

  clearSelection(): void {
    this.selectedTask = null;
  }

  private groupTasks(tasks: Task[], term: string): Record<TaskStatus, Task[]> {
    const initial: Record<TaskStatus, Task[]> = {
      todo: [],
      inProgress: [],
      done: [],
    };

    const filtered = term
      ? tasks.filter((task) =>
          [task.title, task.description].some((field) => field.toLowerCase().includes(term)),
        )
      : tasks;

    return filtered.reduce((acc, task) => {
      acc[task.status] = [...(acc[task.status] ?? []), task];
      return acc;
    }, initial);
  }
}
