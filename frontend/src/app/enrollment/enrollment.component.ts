import { AlertService } from './../../../../../sampleappexpressjsangular/frontend/src/app/alert/alert.service';
import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from './enrollment.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {

  constructor(
    private enrollmentService: EnrollmentService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
  }

  enroll() {
    // TODO
    // requête POST
  }

}
