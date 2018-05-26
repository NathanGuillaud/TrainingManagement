import { AuthenticationService } from './../../authentication/authentication.service';
import { UserService } from './../../user/user.service';
import { User } from './../../model/user';
import { Enrollment } from './../../model/enrollment';
import { Course } from './../../model/course';
import { ExtendedCourse } from './../../model/extendedCourse';
import { CourseService } from './../../course/course.service';
import { AlertService } from './../../alert/alert.service';
import { Training } from './../../model/training';
import { TrainingService } from './../../training/training.service';
import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from './../enrollment.service';

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.css']
})
export class EnrollmentListComponent implements OnInit {
  extendedCourses: ExtendedCourse[] = [];
  courses: Course[] = [];
  enrollments: Enrollment[] = [];
  currentCourse: Course;
  currentEnrollment: Enrollment;
  enrollment: any = {};

  constructor(
    private enrollmentService: EnrollmentService,
    private alertService: AlertService,
    private trainingService: TrainingService,
    private courseService: CourseService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.loadAllEnrollments();
  }

  private loadAllEnrollments() {
    this.enrollmentService.getAllEnrollmentsByUserId(this.authenticationService.getUserId()).subscribe(
      results => {
        this.enrollments = results;
      },
      error => {
        this.alertService.error(error.status, error.error.message);
      });
  }

}
