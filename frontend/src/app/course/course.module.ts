import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import { CourseService } from './course.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    CourseComponent
  ],
  exports: [
    CourseComponent
  ],
  providers: [
    CourseService
  ]
})
export class CourseModule { }
