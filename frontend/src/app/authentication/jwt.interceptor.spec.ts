import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { JwtInterceptor } from './jwt.interceptor';

describe('InterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtInterceptor],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
    });
  });

  it('should be created', inject([JwtInterceptor], (service: JwtInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
