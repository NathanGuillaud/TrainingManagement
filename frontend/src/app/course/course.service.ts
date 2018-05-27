import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../model/course';

@Injectable()
export class CourseService {

  constructor(private http: HttpClient) { }

  getAllCourses(trainingId: number) {
    return this.http.get<Course[]>('http://localhost:8080/api/private/trainings/' + trainingId + '/courses');
  }

  deleteCourse(id: number) {
    return this.http.delete('http://localhost:8080/api/admin/private/courses/' + id);
  }

  updateCourse(course: Course) {
    return this.http.put('http://localhost:8080/api/admin/private/courses/' + course.id, course);
  }

  createCourse(trainingId: number, course: Course) {
    return this.http.post('http://localhost:8080/api/admin/private/trainings/' + trainingId + '/courses', course);
  }

}
