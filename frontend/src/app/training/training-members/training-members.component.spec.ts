import { AuthenticationModule } from './../authentication/authentication.module';
import { TrainingModule } from './../training/training.module';
import { AlertModule } from './../alert/alert.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MemberModule } from './../member/member.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingMembersComponent } from './training-members.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TrainingMembersComponent', () => {
  let component: TrainingMembersComponent;
  let fixture: ComponentFixture<TrainingMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingMembersComponent ],
      imports: [RouterTestingModule, MemberModule, HttpClientTestingModule, AlertModule, TrainingModule, AuthenticationModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
