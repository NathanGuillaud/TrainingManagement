import { Enrollment } from './../model/enrollment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EnrollmentService {

  constructor(private http: HttpClient) { }

  createEnrollment(userId: number, courseId: number) {
    return this.http.post('http://localhost:8080/api/private/users/' + userId + '/courses/' + courseId, null);
  }

  getAllEnrollments(userId: number, trainingId: number) {
    return this.http.get<Enrollment[]>('http://localhost:8080/api/private/users/' + userId + '/trainings/' + trainingId + '/enrollments');
  }

}
