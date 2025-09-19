import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MaterialModule],
  exports: [CommonModule, ReactiveFormsModule, RouterModule, MaterialModule, ToolbarComponent],
})
export class SharedModule {}
