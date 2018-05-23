import { TestBed, inject } from '@angular/core/testing';

import { TrainingService } from './training.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TrainingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainingService],
      imports: [ HttpClientTestingModule]
    });
  });

  it('should be created', inject([TrainingService], (service: TrainingService) => {
    expect(service).toBeTruthy();
  }));
});
