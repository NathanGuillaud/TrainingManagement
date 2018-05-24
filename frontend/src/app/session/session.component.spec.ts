import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { SessionModule } from './session.module';
import { SessionService } from './session.service';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SessionComponent } from './session.component';
import { AlertModule } from '../alert/alert.module';

describe('SessionComponent', () => {
  let component: SessionComponent;
  let fixture: ComponentFixture<SessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [FormsModule, RouterTestingModule, SessionModule, HttpClientTestingModule, AlertModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
