import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionComponent } from './session.component';
import { SessionService } from './session.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    SessionComponent
  ],
  exports: [
    SessionComponent
  ],
  providers: [
    SessionService
  ]
})
export class SessionModule { }
