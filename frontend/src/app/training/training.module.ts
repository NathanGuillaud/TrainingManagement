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
import { TrainingMembersComponent } from '../training/training-members/training-members.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FilterPipe } from '../shared/filter.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DataTablesModule,
    NgxPaginationModule,
    SharedModule
  ],
  declarations: [
    TrainingComponent,
    TrainingCreateComponent,
    TrainingEditComponent,
    TrainingMembersComponent,
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
