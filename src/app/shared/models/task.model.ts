export type TaskStatus = 'todo' | 'inProgress' | 'done';

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface TaskFilters {
  term: string;
}
