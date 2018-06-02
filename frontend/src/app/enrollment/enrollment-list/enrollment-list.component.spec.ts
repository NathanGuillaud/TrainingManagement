import { Enrollment } from './../../model/enrollment';
import { EnrollmentService } from './../enrollment.service';
import { AuthenticationModule } from './../../authentication/authentication.module';
import { AlertModule } from './../../alert/alert.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentComponent } from './../enrollment.component';
import { EnrollmentModule } from '../../enrollment/enrollment.module';
import { EnrollmentListComponent } from './enrollment-list.component';

describe('EnrollmentListComponent', () => {
  let component: EnrollmentListComponent;
  let fixture: ComponentFixture<EnrollmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentListComponent ],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule, AlertModule, AuthenticationModule, EnrollmentModule],
      providers: [EnrollmentService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
