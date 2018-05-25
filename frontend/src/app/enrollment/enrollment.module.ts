import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentComponent } from './enrollment.component';
import { EnrollmentService } from './enrollment.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EnrollmentComponent
  ],
  exports: [
    EnrollmentComponent
  ],
  providers: [
    EnrollmentService
  ]
})
export class EnrollmentModule { }
