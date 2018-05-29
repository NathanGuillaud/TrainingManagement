import { Enrollment } from './../model/enrollment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class EnrollmentService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  createEnrollment(memberId: number, courseId: number) {
    return this.http.post(this.baseUrl + '/private/members/' + memberId + '/courses/' + courseId + '/enrollments', null);
  }

  getAllEnrollmentsByMemberIdTrainingId(memberId: number, trainingId: number) {
    return this.http.get<Enrollment[]>(
      this.baseUrl + '/private/members/' + memberId + '/trainings/' + trainingId + '/enrollments');
  }

  deleteEnrollment(enrollmentId: number) {
    return this.http.delete(this.baseUrl + '/private/enrollments/' + enrollmentId);
  }

  getAllEnrollmentsByMemberId(memberId: number) {
    return this.http.get<Enrollment[]>(this.baseUrl + '/private/members/' + memberId + '/enrollments');
  }

}
