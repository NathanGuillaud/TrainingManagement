import { AuthenticationService } from './../authentication/authentication.service';
import { UserService } from './../user/user.service';
import { User } from './../model/user';
import { Enrollment } from './../model/enrollment';
import { Course } from './../model/course';
import { ExtendedCourse } from './../model/extendedCourse';
import { CourseService } from './../course/course.service';
import { AlertService } from './../alert/alert.service';
import { Training } from './../model/training';
import { TrainingService } from './../training/training.service';
import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from './enrollment.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {
  currentUser: User;
  currentTraining: Training;
  extendedCourses: ExtendedCourse[] = [];
  courses: Course[] = [];
  enrollments: Enrollment[] = [];
  isSelected = false;

  constructor(
    private enrollmentService: EnrollmentService,
    private alertService: AlertService,
    private trainingService: TrainingService,
    private courseService: CourseService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.currentTraining = this.trainingService.trainingStorage;
    this.loadAllCourses(this.currentTraining);
  }

  checkSelected() {
    this.extendedCourses.forEach(extendedCourse => {
      this.enrollments.forEach(enrollment => {
        if (enrollment.id === extendedCourse.id) {
          extendedCourse.isSelected = true;
        }
      });
    });
  }

  enroll() {
    // changement de la couleur de la card
    // requête POST avec course (et pas extendedCourse)
    // mettre à jour le isSelected du extendedCourse correspondant
  }

  private loadAllCourses(training: Training) {
    this.courseService.getAllCourses(training.id).subscribe(
      results => {
        this.courses = results;
        this.courses.forEach(course => {
          this.extendedCourses.push(
            new ExtendedCourse(
              course.id,
              course.begin,
              course.end,
              course.price,
              course.TrainingId,
              false
            )
          );
        });
        this.loadAllEnrollments(this.currentTraining);
      },
      error => {
        this.alertService.error(error.status, error.error.message);
      });
  }

  private loadAllEnrollments(training: Training) {
    this.enrollmentService.getAllEnrollments(this.authenticationService.getUserId(), training.id).subscribe(
      results => {
        this.enrollments = results;
        this.checkSelected();
      },
      error => {
        this.alertService.error(error.status, error.error.message);
      });
  }

}
