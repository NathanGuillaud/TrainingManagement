import { Enrollment } from './../model/enrollment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EnrollmentService {

  constructor(private http: HttpClient) { }

  createEnrollment(memberId: number, courseId: number) {
    return this.http.post('http://localhost:8080/api/private/members/' + memberId + '/courses/' + courseId + '/enrollments', null);
  }

  getAllEnrollmentsByMemberIdTrainingId(memberId: number, trainingId: number) {
    return this.http.get<Enrollment[]>('http://localhost:8080/api/private/members/' + memberId + '/trainings/' + trainingId + '/enrollments');
  }

  deleteEnrollment(enrollmentId: number) {
    return this.http.delete('http://localhost:8080/api/private/enrollments/' + enrollmentId);
  }

  getAllEnrollmentsByMemberId(memberId: number) {
    return this.http.get<Enrollment[]>('http://localhost:8080/api/private/members/' + memberId + '/enrollments');
  }

}
