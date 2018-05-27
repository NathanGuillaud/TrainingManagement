import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { EnrollmentService } from './enrollment.service';

describe('EnrollmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnrollmentService],
      imports: [ HttpClientTestingModule]
    });
  });

  // it('should be created', inject([EnrollmentService], (service: EnrollmentService) => {
  //   expect(service).toBeTruthy();
  // }));
});
