import { TrainingService } from './training.service';
import { AuthenticationModule } from './../authentication/authentication.module';
import { TrainingModule } from './training.module';
import { AlertModule } from './../alert/alert.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserModule } from './../user/user.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingComponent } from './training.component';
import { Training } from '../model/training';
import 'rxjs/add/observable/of';

const testTrainings = [
  new Training(
    1,
    'Test training 1',
    'Test training 1 description',
    'Test training 1 adresse',
    'Test training 1 ville',
    11111
  ),
  new Training(
    2,
    'Test training 2',
    'Test training 2 description',
    'Test training 2 adresse',
    'Test training 2 ville',
    22222
  ),
];

describe('TrainingComponent', () => {
  let component: TrainingComponent;
  let fixture: ComponentFixture<TrainingComponent>;
  let trainingService: TrainingService;
  let app;
  let compiled;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [FormsModule, RouterTestingModule, UserModule, HttpClientTestingModule, AlertModule, TrainingModule, AuthenticationModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingComponent);
    component = fixture.componentInstance;
    trainingService = TestBed.get(TrainingService);
    app = fixture.debugElement.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete the training', () => {
    spyOn(trainingService, 'deleteTraining').and.returnValue(Observable.of(testTrainings[0]));
    app.deleteTraining(1);
    expect(trainingService.deleteTraining).toHaveBeenCalledWith(1);
  });

  it('should render title in a h1 tag', async(() => {
    expect(compiled.querySelector('h1').textContent).toContain('Liste des stages');
  }));

  it('should render training in a td with id trainingIdx', async(() => {
    spyOn(trainingService, 'getAllTrainings').and.returnValue(Observable.of(testTrainings));
    app.loadAllTrainings();
    expect(trainingService.getAllTrainings).toHaveBeenCalled();

    fixture.detectChanges();

    const trainings = compiled.querySelectorAll('tbody tr');
    expect(trainings.length).toBe(2);

    expect(compiled.querySelector('#trainingId1').textContent).toContain('1');
    expect(compiled.querySelector('#trainingId2').textContent).toContain('2');

  }));
});
