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
  enrollments: Enrollment[] = [];
  sortedEnrollments: Enrollment[][] = [];
  currentEnrollmentId: number;
  allTrainingId: number[];

  constructor(
    private enrollmentService: EnrollmentService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.loadAllEnrollments();
  }

  private loadAllEnrollments() {
    this.enrollmentService.getAllEnrollmentsByUserId(this.authenticationService.getUserId()).subscribe(
      results => {
        this.enrollments = results;
        // if (results.length > 0) {
        //   this.currentEnrollmentId = results[0].Course.TrainingId;
        //   this.allTrainingId.push(this.currentEnrollmentId);
        //   results.forEach(enrollment => {
        //     if (this.currentEnrollmentId !== enrollment.Course.TrainingId) {
        //       this.currentEnrollmentId = enrollment.Course.TrainingId;
        //       this.allTrainingId.push(this.currentEnrollmentId);
        //     }
        //   });
        //   console.log(this.allTrainingId);
        // }
      },
      error => {
        this.alertService.error(error.status, error.error.message);
      });
  }

  // private getAllTrainingId(enrollments: Enrollment[]): number[] {
  //   if (enrollments.length > 0) {
  //     this.currentEnrollmentId = enrollments[0].Course.TrainingId;
  //     this.allTrainingId.push(this.currentEnrollmentId);
  //     enrollments.forEach(enrollment => {
  //       if (this.currentEnrollmentId !== enrollment.Course.TrainingId) {
  //         this.currentEnrollmentId = enrollment.Course.TrainingId;
  //         this.allTrainingId.push(this.currentEnrollmentId);
  //       }
  //     });
  //     console.log(this.allTrainingId);
  //     return this.allTrainingId;
  //   }
  // }
}
