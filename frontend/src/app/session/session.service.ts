import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from '../model/session';

@Injectable()
export class SessionService {

  constructor(private http: HttpClient) { }

  getAllSessions(trainingId) {
    return this.http.get<Session[]>('http://localhost:8080/api/private/trainings/' + trainingId + '/sessions');
  }

  deleteSession(id: number) {
    return this.http.delete('http://localhost:8080/api/admin/private/sessions/' + id);
  }

  updateSession(session: Session) {
    return this.http.put('http://localhost:8080/api/admin/private/sessions/' + session.id, session);
  }

  createSession(trainingId, session: Session) {
    return this.http.post('http://localhost:8080/api/admin/private/trainings/' + trainingId + '/sessions', session);
  }

}
