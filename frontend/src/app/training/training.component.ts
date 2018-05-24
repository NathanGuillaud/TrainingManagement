import { SessionComponent } from './../session/session.component';
import { ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { SessionService } from './../session/session.service';
import { TrainingService } from './training.service';
import { User } from './../model/user';
import { AuthenticationService } from './../authentication/authentication.service';
import { AlertService } from './../alert/alert.service';
import { Component, OnInit } from '@angular/core';
import { Training } from '../model/training';
import { Session } from '../model/session';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  trainings: Training[] = [];
  sessions: Session[] = [];
  isAdmin: boolean;
  // pour afficher le training correspondants aux sessions affichées
  currentTraining: Training = new Training(0, '', '', '', '', 0);
  // pour afficher ou non les sessions
  sessionEnabled = false;

  @ViewChild('viewContainerRef', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(
    private trainingService: TrainingService,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private resolver: ComponentFactoryResolver
  ) { }

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

  // Call API to load sessions and then add dynamic components
  private loadAllSessions(training: Training) {
    this.sessionService.getAllSessions(training.id).subscribe(
      results => {
        this.sessions = results;
        // Add dynamic component
        this.addComponent(training);
      },
      error => {
        this.alertService.error(error.status, error.error.message);
      });
  }

  // Load existing data
  loadSessions(training) {
    this.sessionEnabled = true;
    this.currentTraining.id = training.id;
    this.currentTraining.name = training.name;

    this.loadAllSessions(training);
  }

  // Add dynamic component
  addComponent(training, newItem?) {
    let component;
    let sessionComponent;

    // New item means we already load existing sessions
    // and we just want to create a new session
    if (this.sessions.length === 0 || newItem) {
      component = this.resolver.resolveComponentFactory(SessionComponent);
      sessionComponent = this.container.createComponent(component);
      sessionComponent.instance.currentTraining = this.currentTraining;
      // sessionComponent.instance.session = new Session(0, '', '', 0, 0);
      sessionComponent.instance.refChild = sessionComponent;
    } else {
      this.sessions.forEach(session => {
        component = this.resolver.resolveComponentFactory(SessionComponent);
        sessionComponent = this.container.createComponent(component);
        sessionComponent.instance.refChild = sessionComponent;
        sessionComponent.instance.session = session;
     });
    }
  }

  // Sessions component is closed (hidden)
  closeComponents() {
    this.sessionEnabled = false;
    this.container.clear();
  }
}
