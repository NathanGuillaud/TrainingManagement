import { TrainingCreateComponent } from './training-create/training-create.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingComponent } from './training.component';
import { TrainingService } from './training.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TrainingEditComponent } from './training-edit/training-edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    TrainingComponent,
    TrainingCreateComponent,
    TrainingEditComponent
  ],
  exports: [
    TrainingComponent,
    TrainingCreateComponent,
    TrainingEditComponent
  ],
  providers: [
    TrainingService
  ]
})
export class TrainingModule { }
