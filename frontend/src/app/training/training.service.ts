import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Training } from '../model/training';

@Injectable()
export class TrainingService {

  constructor(private http: HttpClient) { }

  getAllTrainings() {
    return this.http.get<Training[]>('http://localhost:8080/api/private/trainings');
  }

  getTraining(id: number) {
    return this.http.get<Training[]>('http://localhost:8080/api/private/trainings/' + id);
  }

  deleteTraining(id: number) {
    return this.http.delete('http://localhost:8080/api/private/trainings/' + id);
  }

  updateTraining(training: Training) {
    return this.http.put('http://localhost:8080/api/private/trainings/' + training.id, training);
  }

  createTraining(training: Training) {
    return this.http.post('http://localhost:8080/api/private/trainings', training);
  }

}
