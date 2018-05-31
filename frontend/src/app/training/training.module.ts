import { CourseService } from './../course/course.service';
import { TrainingCreateComponent } from './training-create/training-create.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingComponent } from './training.component';
import { TrainingService } from './training.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TrainingEditComponent } from './training-edit/training-edit.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DataTablesModule
  ],
  declarations: [
    TrainingComponent,
    TrainingCreateComponent,
    TrainingEditComponent
  ],
  exports: [
    TrainingComponent,
    TrainingCreateComponent,
    TrainingEditComponent
  ],
  providers: [
    TrainingService,
    CourseService
  ]
})
export class TrainingModule { }
