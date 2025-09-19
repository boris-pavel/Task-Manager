import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Task, TaskStatus } from '../../../shared/models/task.model';

export interface TaskStatusOption {
  label: string;
  value: TaskStatus;
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent implements OnChanges {
  @Input() task: Task | null = null;
  @Input() statusOptions: TaskStatusOption[] = [];
  @Output() save = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  readonly taskForm = this.fb.group({
    id: this.fb.control<number | null>(null),
    title: this.fb.control('', {
      validators: [Validators.required, Validators.maxLength(80)],
      nonNullable: true,
    }),
    description: this.fb.control('', {
      validators: [Validators.required, Validators.maxLength(255)],
      nonNullable: true,
    }),
    status: this.fb.control<TaskStatus>('todo', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor(private readonly fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']) {
      const value = this.task ?? { id: null, title: '', description: '', status: 'todo' };
      this.taskForm.reset({
        id: value.id ?? null,
        title: value.title,
        description: value.description,
        status: value.status,
      });
    }
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const { id, ...rest } = this.taskForm.getRawValue();
    const payload: Task = { ...rest, ...(id ? { id } : {}) } as Task;
    this.save.emit(payload);
    if (!payload.id) {
      this.taskForm.reset({ id: null, title: '', description: '', status: 'todo' });
    }
  }

  onCancel(): void {
    this.taskForm.reset({ id: null, title: '', description: '', status: 'todo' });
    this.cancel.emit();
  }

  get title() {
    return this.taskForm.controls.title;
  }

  get description() {
    return this.taskForm.controls.description;
  }
}
