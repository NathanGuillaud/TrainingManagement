import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { environment } from '../../environments/environment';

@Injectable()
export class CourseService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllCourses(trainingId: number) {
    return this.http.get<Course[]>(this.baseUrl + '/private/trainings/' + trainingId + '/courses');
  }

  deleteCourse(id: number) {
    return this.http.delete(this.baseUrl + '/admin/private/courses/' + id);
  }

  updateCourse(course: Course) {
    return this.http.put(this.baseUrl + '/admin/private/courses/' + course.id, course);
  }

  createCourse(trainingId: number, course: Course) {
    return this.http.post(this.baseUrl + '/admin/private/trainings/' + trainingId + '/courses', course);
  }

}
