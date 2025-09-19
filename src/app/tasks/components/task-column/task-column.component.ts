import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Task, TaskStatus } from '../../../shared/models/task.model';
import { TaskStatusOption } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-column',
  templateUrl: './task-column.component.html',
  styleUrls: ['./task-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskColumnComponent {
  @Input() title = '';
  @Input() status!: TaskStatus;
  @Input() tasks: Task[] = [];
  @Input() statusOptions: TaskStatusOption[] = [];
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() statusChange = new EventEmitter<{ task: Task; status: TaskStatus }>();

  trackByTask(_index: number, task: Task): number | string {
    return task.id ?? task.title;
  }

  onStatusChange(task: Task, status: TaskStatus): void {
    if (task.status === status) {
      return;
    }

    this.statusChange.emit({ task, status });
  }
}
