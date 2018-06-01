import { FilterPipe } from './../shared/filter.pipe';
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
import { TrainingMembersComponent } from '../training-members/training-members.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DataTablesModule,
    NgxPaginationModule
  ],
  declarations: [
    TrainingComponent,
    TrainingCreateComponent,
    TrainingEditComponent,
    TrainingMembersComponent,
    FilterPipe
  ],
  exports: [
    TrainingComponent,
    TrainingCreateComponent,
    TrainingEditComponent,
    TrainingMembersComponent
  ],
  providers: [
    TrainingService,
    CourseService
  ]
})
export class TrainingModule { }
