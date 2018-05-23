import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationGuard } from './authentication.guard';
import { JwtInterceptor } from './jwt.interceptor';
import { AuthenticationService } from './authentication.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AuthenticationGuard, JwtInterceptor, AuthenticationService]
})
export class AuthenticationModule { }
