import { AuthenticationModule } from './../authentication/authentication.module';
import { TrainingModule } from './training.module';
import { AlertModule } from './../alert/alert.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserModule } from './../user/user.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingComponent } from './training.component';

describe('TrainingComponent', () => {
  let component: TrainingComponent;
  let fixture: ComponentFixture<TrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  ],
      imports: [ FormsModule , RouterTestingModule, UserModule, HttpClientTestingModule, AlertModule, TrainingModule, AuthenticationModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
