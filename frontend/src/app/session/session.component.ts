import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from './../alert/alert.service';
import { SessionService } from './session.service';
import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../model/session';
import { Training } from '../model/training';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  session: any = {};
  currentTraining: Training;
  saving = false;
  public refChild: any;

  constructor(
    private sessionService: SessionService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  save() {
    this.saving = true;
    if (typeof this.session.id === 'undefined') {
      this.sessionService.createSession(this.currentTraining.id, this.session)
        .subscribe(
          session => {
            // set success message and pass true paramater to persist the message after redirecting to the login page
            this.alertService.success(200, 'Création de séance effectuée.', true);
            this.session = session;
          },
          error => {
            this.alertService.error(error.status, error.error.message);
            this.saving = false;
          });
    } else {
      this.sessionService.updateSession(this.session)
      .subscribe(
        session => {
          // set success message and pass true paramater to persist the message after redirecting to the login page
          this.alertService.success(200, 'Modification de séance effectuée.', true);
          this.session = session;
        },
        error => {
          this.alertService.error(error.status, error.error.message);
          this.saving = false;
        });
    }
  }

  private remove() {
    this.saving = true;

    this.refChild.destroy();

    this.sessionService.deleteSession(this.session.id)
      .subscribe(
        session => {
          // set success message and pass true paramater to persist the message after redirecting to the login page
          this.alertService.success(200, 'Suppression de séance effectuée.', true);
          this.session = session;
        },
        error => {
          this.alertService.error(error.status, error.error.message);
          this.saving = false;
        });
  }
}
