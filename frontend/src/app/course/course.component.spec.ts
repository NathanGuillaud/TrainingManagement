import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { CourseModule } from './course.module';
import { CourseService } from './course.service';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CourseComponent } from './course.component';
import { AlertModule } from '../alert/alert.module';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [FormsModule, RouterTestingModule, CourseModule, HttpClientTestingModule, AlertModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
