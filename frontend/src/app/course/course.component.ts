import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from './../alert/alert.service';
import { CourseService } from './course.service';
import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../model/course';
import { Training } from '../model/training';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: any = {};
  currentTraining: Training;
  saving = false;
  public refChild: any;

  constructor(
    private sessionService: CourseService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  save() {
    this.saving = true;
    if (typeof this.course.id === 'undefined') {
      this.sessionService.createCourse(this.currentTraining.id, this.course)
        .subscribe(
          course => {
            // set success message and pass true paramater to persist the message after redirecting to the login page
            this.alertService.success(200, 'Création de séance effectuée.', true);
            this.course = course;
          },
          error => {
            this.alertService.error(error.status, error.error.message);
            this.saving = false;
          });
    } else {
      this.sessionService.updateCourse(this.course)
      .subscribe(
        course => {
          // set success message and pass true paramater to persist the message after redirecting to the login page
          this.alertService.success(200, 'Modification de séance effectuée.', true);
          this.course = course;
        },
        error => {
          this.alertService.error(error.status, error.error.message);
          this.saving = false;
        });
    }
  }

  remove() {
    this.saving = true;

    this.refChild.destroy();

    this.sessionService.deleteCourse(this.course.id)
      .subscribe(
        course => {
          // set success message and pass true paramater to persist the message after redirecting to the login page
          this.alertService.success(200, 'Suppression de séance effectuée.', true);
          this.course = course;
        },
        error => {
          this.alertService.error(error.status, error.error.message);
          this.saving = false;
        });
  }
}
