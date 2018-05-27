import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './../../authentication/authentication.service';
import { UserService } from './../../user/user.service';
import { User } from './../../model/user';
import { Enrollment } from './../../model/enrollment';
import { AlertService } from './../../alert/alert.service';
import { Training } from './../../model/training';
import { TrainingService } from './../../training/training.service';
import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from './../enrollment.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.css']
})
export class EnrollmentListComponent implements OnInit {
  enrollments: Enrollment[] = [];
  trainingsMap = new Map<number, Enrollment[]>();
  enrollmentsArr: Enrollment[] = [];
  trainingNamesMap = new Map<number, string>();

  constructor(
    private enrollmentService: EnrollmentService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private trainingService: TrainingService,
  ) { }

  ngOnInit() {
    this.loadAllEnrollments();
  }

  private loadAllEnrollments() {
    let currentTrainingId: number;
    this.enrollmentService.getAllEnrollmentsByUserId(this.authenticationService.getUserId()).subscribe(
      results => {
        this.enrollments = results;
        // Affectation de l'id courant
        if (this.enrollments.length > 0) {
          currentTrainingId = this.enrollments[0]['Course'].TrainingId;
          this.getTrainingNameById(currentTrainingId);
        }
        // Parcours de toutes les inscriptions pour les regrouper par stage dans une map
        this.enrollments.forEach(enrollment => {
          if (enrollment['Course'].TrainingId !== currentTrainingId) {
            this.enrollmentsArr = [];
            currentTrainingId = enrollment['Course'].TrainingId;
            this.getTrainingNameById(currentTrainingId);
          }
          this.enrollmentsArr.push(enrollment);
          this.trainingsMap.set(enrollment['Course'].TrainingId, this.enrollmentsArr);
        });
      },
      error => {
        this.alertService.error(error.status, error.error.message);
      });
  }

  // Insère dans la map contenant l'id d'un training avec son nom
  private getTrainingNameById(trainingId: number) {
    let currentTraining: Training;
    this.trainingService.getTraining(trainingId).subscribe(
      training => {
        currentTraining = training;
        this.trainingNamesMap.set(trainingId, currentTraining.name);
      },
      error => {
        this.alertService.error(error.status, error.error.message);
      });
  }

  // transforme une map en tableau (pour l'affichage avec le ngFor)
  getKeys(map) {
    return Array.from(map.keys());
  }
}
