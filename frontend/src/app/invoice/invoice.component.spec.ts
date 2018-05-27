import { AuthenticationModule } from './../authentication/authentication.module';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { InvoiceModule } from './invoice.module';
import { InvoiceService } from './invoice.service';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './../authentication/authentication.service';

import { InvoiceComponent } from './invoice.component';
import { AlertModule } from '../alert/alert.module';

describe('InvoiceComponent', () => {
  let component: InvoiceComponent;
  let fixture: ComponentFixture<InvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [FormsModule, RouterTestingModule, InvoiceModule, HttpClientTestingModule, AlertModule, AuthenticationModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
