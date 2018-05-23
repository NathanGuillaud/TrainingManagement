import { AlertService } from './../../alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TrainingService } from './../training.service';
import { Training } from './../../model/training';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training-edit',
  templateUrl: './training-edit.component.html',
  styleUrls: ['./training-edit.component.css']
})
export class TrainingEditComponent implements OnInit {

  training: any = {};
  saving = false;

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private trainingService: TrainingService,
      private alertService: AlertService) { }

    ngOnInit() {
      this.getTraining(this.route.snapshot.params.id);
    }

    getTraining(id) {
      this.trainingService.getTraining(id)
      .subscribe(
        training => { this.training = training;
      });
    }

    update() {
        this.saving = true;
        this.trainingService.updateTraining(this.training)
            .subscribe(
              training => this.router.navigate(['/trainings']),
              error => {
                this.alertService.error(error.status, error.error.message);
                this.saving = false;
              });
    }
}
