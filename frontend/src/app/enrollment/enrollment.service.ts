import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EnrollmentService {

  constructor(private http: HttpClient) { }

  createEnrollment(userId: number, sessionId: number) {
    return this.http.post('http://localhost:8080/api/private/users/' + userId + '/sessions/' + sessionId, null);
  }

}
