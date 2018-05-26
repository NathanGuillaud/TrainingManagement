import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentComponent } from './enrollment.component';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentListComponent } from './enrollment-list/enrollment-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EnrollmentComponent,
    EnrollmentListComponent
  ],
  exports: [
    EnrollmentComponent,
    EnrollmentListComponent
  ],
  providers: [
    EnrollmentService
  ]
})
export class EnrollmentModule { }
