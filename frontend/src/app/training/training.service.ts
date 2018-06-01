import { Member } from './../model/member';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Training } from '../model/training';
import { environment } from '../../environments/environment';

@Injectable()
export class TrainingService {

  baseUrl = environment.baseUrl;

  public trainingStorage: Training;

  constructor(private http: HttpClient) { }

  getAllTrainings() {
    return this.http.get<Training[]>(this.baseUrl + '/private/trainings');
  }

  getTraining(id: number) {
    return this.http.get<Training>(this.baseUrl + '/private/trainings/' + id);
  }

  deleteTraining(id: number) {
    return this.http.delete(this.baseUrl + '/admin/private/trainings/' + id);
  }

  updateTraining(training: Training) {
    return this.http.put(this.baseUrl + '/admin/private/trainings/' + training.id, training);
  }

  createTraining(training: Training) {
    return this.http.post(this.baseUrl + '/admin/private/trainings', training);
  }

  getAllMembersByTrainingId(trainingId: number, offset, limit) {
    return this.http.get<Member[]>(
      this.baseUrl + '/private/trainings/' + trainingId + '/members?offset=' + offset + '&limit=' + limit);
  }

}
