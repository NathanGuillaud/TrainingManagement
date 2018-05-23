import { TrainingService } from './training.service';
import { User } from './../model/user';
import { AuthenticationService } from './../authentication/authentication.service';
import { AlertService } from './../alert/alert.service';
import { Component, OnInit } from '@angular/core';
import { Training } from '../model/training';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  trainings: Training[] = [];
  isAdmin: boolean;

  constructor(private trainingService: TrainingService, private alertService: AlertService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.loadAllTrainings();
    this.isAdmin = this.authService.isAdmin();
  }

  private loadAllTrainings() {
    this.trainingService.getAllTrainings().subscribe(
      results => { this.trainings = results; },
      error => {
        this.alertService.error(error.status, error.error.message);
    });
  }

  private deleteTraining(id) {
    this.trainingService.deleteTraining(id).subscribe(() => { this.loadAllTrainings(); },
      error => {
        this.alertService.error(error.status, error.error.message);
    });
  }
}
