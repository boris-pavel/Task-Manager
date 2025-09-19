import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TasksRoutingModule } from './tasks-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskColumnComponent } from './components/task-column/task-column.component';

@NgModule({
  declarations: [DashboardComponent, TaskFormComponent, TaskColumnComponent],
  imports: [SharedModule, TasksRoutingModule],
})
export class TasksModule {}
