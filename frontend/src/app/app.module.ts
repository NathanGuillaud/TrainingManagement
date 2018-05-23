import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';

import { AlertModule } from './alert/alert.module';
import { AlertService } from './alert/alert.service';
import { HeaderComponent } from './header/header.component';
import { HeaderModule } from './header/header.module';
import { RegisterModule } from './register/register.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { TrainingModule } from './training/training.module';
import { UserService } from './user/user.service';
import { RoutingModule } from './routing/routing.module';
import { JwtInterceptor } from './authentication/jwt.interceptor';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthenticationService } from './authentication/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthenticationModule,
    FormsModule,
    RoutingModule,
    AlertModule,
    HeaderModule,
    HomeModule,
    LoginModule,
    RegisterModule,
    TrainingModule
  ],
  providers: [
    AlertService,
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    { provide: APP_BASE_HREF, useValue: '/training-app' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
