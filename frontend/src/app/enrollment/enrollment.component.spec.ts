import { EnrollmentService } from './enrollment.service';
import { AuthenticationModule } from './../authentication/authentication.module';
import { AlertModule } from './../alert/alert.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentComponent } from './enrollment.component';
import { TrainingModule } from '../training/training.module';

describe('EnrollmentComponent', () => {
  let component: EnrollmentComponent;
  let fixture: ComponentFixture<EnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentComponent ],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule, AlertModule, AuthenticationModule, TrainingModule],
      providers: [EnrollmentService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
