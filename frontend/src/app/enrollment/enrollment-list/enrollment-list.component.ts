import { AuthenticationService } from './../../authentication/authentication.service';
import { UserService } from './../../user/user.service';
import { User } from './../../model/user';
import { Enrollment } from './../../model/enrollment';
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
    private trainingService: TrainingService,
  ) { }

  ngOnInit() {
    this.loadAllEnrollments();
    // console.log(this.getTrainingNameById(1));
  }

  private loadAllEnrollments() {
    this.enrollmentService.getAllEnrollmentsByUserId(this.authenticationService.getUserId()).subscribe(
      results => {
        this.enrollments = results;
        // this.getAllTrainingId(this.enrollments);
        console.log(this.enrollments[0]['Course'].TrainingId);
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

  // private getAllTrainingId(enrollments: Enrollment[]) {
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

  // private getTrainingNameById(trainingId: number): string {
  //   let a: string;
  //   this.trainingService.getTraining(trainingId).subscribe(
  //     training => {
  //       this.currentTraining = training;
  //       a = this.currentTraining.name;
  //       console.log('DANS REQUETE');
  //       console.log(a);
  //       // this.getTrainingName();
  //     },
  //     error => {
  //       this.alertService.error(error.status, error.error.message);
  //     });
  //   if (a === 'undefined') { console.log('PAS DEFINI'); }
  //   console.log('FIN REQUETE');
  //   console.log(a);
  //   return a;
  // }

  // utilisée pour getTrainingById juste après la requête pour renvoyer dans le HTML
  // private getTrainingName(): string {
  //   const res = this.currentTraining.name;
  //   console.log(res);
  //   return res;
  // }
}
