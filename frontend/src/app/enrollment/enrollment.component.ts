import { AuthenticationService } from './../authentication/authentication.service';
import { UserService } from './../user/user.service';
import { User } from './../model/user';
import { Enrollment } from './../model/enrollment';
import { Course } from './../model/course';
import { ExtendedCourse } from './../model/extendedCourse';
import { CourseService } from './../course/course.service';
import { AlertService } from './../alert/alert.service';
import { Training } from './../model/training';
import { TrainingService } from './../training/training.service';
import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from './enrollment.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {
  currentUser: User;
  currentTraining: Training;
  extendedCourses: ExtendedCourse[] = [];
  courses: Course[] = [];
  enrollments: Enrollment[] = [];
  currentCourse: Course;
  currentEnrollment: Enrollment;
  enrollment: any = {};

  constructor(
    private enrollmentService: EnrollmentService,
    private alertService: AlertService,
    private trainingService: TrainingService,
    private courseService: CourseService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.currentTraining = this.trainingService.trainingStorage;
    this.loadAllCourses(this.currentTraining);
  }

  checkSelected() {
    // Pour savoir quelles sont les séances pour laquelle il y a une inscription (pour l'afficher en vert)
    this.extendedCourses.forEach(extendedCourse => {
      this.enrollments.forEach(enrollment => {
        if (enrollment.CourseId === extendedCourse.id) {
          extendedCourse.isSelected = true;
        }
      });
    });
  }

  enroll(extendedCourse: ExtendedCourse) {
    // changement de la couleur de la card
    // S'il existe déjà une inscription pour cette séance, on récupère l'inscription, puis on la supprime
    if (extendedCourse.isSelected) {
      this.enrollments.forEach(enrollment => {
        if (enrollment.CourseId === extendedCourse.id) {
          this.currentEnrollment = enrollment;
        }
      });
      this.enrollmentService.deleteEnrollment(this.currentEnrollment.id)
        .subscribe(
          enrollment => {
            // set success message and pass true paramater to persist the message after redirecting to the login page
            this.alertService.success(200, 'Suppression de l\'inscription effectuée.', true);
            this.enrollment = enrollment;
            // mettre à jour le isSelected du extendedCourse correspondant
            extendedCourse.isSelected = false;
            // On rafraichit la liste des inscriptions
            this.loadAllEnrollments(this.currentTraining);
          },
          error => {
            this.alertService.error(error.status, error.error.message);
          });
    } else {
      // S'il n'existe pas d'inscription pour la séance cliquée, on créé cette inscription
      this.courses.forEach(course => {
        if (course.id === extendedCourse.id) {
          this.currentCourse = course;
        }
      });
      this.enrollmentService.createEnrollment(this.authenticationService.getUserId(), this.currentCourse.id)
        .subscribe(
          enrollment => {
            // set success message and pass true paramater to persist the message after redirecting to the login page
            this.alertService.success(200, 'Création de l\'inscription effectuée.', true);
            this.enrollment = enrollment;
            // mettre à jour le isSelected du extendedCourse correspondant
            extendedCourse.isSelected = true;
            // On rafraichit la liste des inscriptions
            this.loadAllEnrollments(this.currentTraining);
          },
          error => {
            this.alertService.error(error.status, error.error.message);
          });
    }
  }

  private loadAllCourses(training: Training) {
    this.courseService.getAllCourses(training.id).subscribe(
      results => {
        this.courses = results;
        this.courses.forEach(course => {
          this.extendedCourses.push(
            new ExtendedCourse(
              course.id,
              course.begin,
              course.end,
              course.price,
              course.TrainingId,
              false
            )
          );
        });
        this.loadAllEnrollments(this.currentTraining);
      },
      error => {
        this.alertService.error(error.status, error.error.message);
      });
  }

  private loadAllEnrollments(training: Training) {
    this.enrollmentService.getAllEnrollments(this.authenticationService.getUserId(), training.id).subscribe(
      results => {
        this.enrollments = results;
        this.checkSelected();
      },
      error => {
        this.alertService.error(error.status, error.error.message);
      });
  }

}
