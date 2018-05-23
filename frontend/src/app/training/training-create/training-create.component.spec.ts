import { AlertModule } from './../../alert/alert.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserModule } from './../../user/user.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingCreateComponent } from './training-create.component';
import { TrainingModule } from '../training.module';

describe('TrainingCreateComponent', () => {
  let component: TrainingCreateComponent;
  let fixture: ComponentFixture<TrainingCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ FormsModule , RouterTestingModule, UserModule, HttpClientTestingModule, AlertModule, TrainingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
