import { AlertService } from './../../alert/alert.service';
import { TrainingService } from './../training.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-training-create',
  templateUrl: './training-create.component.html',
  styleUrls: ['./training-create.component.css']
})
export class TrainingCreateComponent implements OnInit {
  training: any = {};
  saving = false;

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private trainingService: TrainingService,
      private alertService: AlertService) { }

    ngOnInit() {
    }

    create() {
        this.saving = true;
        this.trainingService.createTraining(this.training)
            .subscribe(
              training => {
                this.alertService.success(200, 'Création de stage effectuée.', true);
                this.router.navigate(['/trainings']);
              },
              error => {
                this.alertService.error(error.status, error.error.message);
                this.saving = false;
              });
    }
}
