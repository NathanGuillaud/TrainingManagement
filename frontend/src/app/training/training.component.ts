import { CourseComponent } from './../course/course.component';
import { ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { CourseService } from './../course/course.service';
import { TrainingService } from './training.service';
import { User } from './../model/user';
import { AuthenticationService } from './../authentication/authentication.service';
import { AlertService } from './../alert/alert.service';
import { Component, OnInit } from '@angular/core';
import { Training } from '../model/training';
import { Course } from '../model/course';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  trainings: Training[] = [];
  courses: Course[] = [];
  isAdmin: boolean;
  // pour afficher le training correspondants aux courses affichées
  currentTraining: Training = new Training(0, '', '', '', '', 0);
  // pour afficher ou non les courses
  courseEnabled = false;

  @ViewChild('viewContainerRef', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(
    private trainingService: TrainingService,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private courseService: CourseService,
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

  // Call API to load courses and then add dynamic components
  private loadAllCourses(training: Training) {
    this.courseService.getAllCourses(training.id).subscribe(
      results => {
        this.courses = results;
        // Add dynamic component
        this.addComponent(training);
      },
      error => {
        this.alertService.error(error.status, error.error.message);
      });
  }

  // Load existing data
  loadCourses(training) {
    this.courseEnabled = true;
    this.currentTraining.id = training.id;
    this.currentTraining.name = training.name;

    this.loadAllCourses(training);
  }

  // Add dynamic component
  addComponent(training, newItem?) {
    let component;
    let courseComponent;

    // New item means we already load existing courses
    // and we just want to create a new course
    if (this.courses.length === 0 || newItem) {
      component = this.resolver.resolveComponentFactory(CourseComponent);
      courseComponent = this.container.createComponent(component);
      courseComponent.instance.currentTraining = this.currentTraining;
      // courseComponent.instance.course = new Course(0, '', '', 0, 0);
      courseComponent.instance.refChild = courseComponent;
    } else {
      this.courses.forEach(course => {
        component = this.resolver.resolveComponentFactory(CourseComponent);
        courseComponent = this.container.createComponent(component);
        courseComponent.instance.refChild = courseComponent;
        courseComponent.instance.course = course;
     });
    }
  }

  // Courses component is closed (hidden)
  closeComponents() {
    this.courseEnabled = false;
    this.container.clear();
  }

  // Récupération du training pour gérer les inscriptions
  saveTraining(training) {
    this.trainingService.trainingStorage = training;
  }
}
