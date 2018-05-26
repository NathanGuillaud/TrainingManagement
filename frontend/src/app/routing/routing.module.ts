import { EnrollmentListComponent } from './../enrollment/enrollment-list/enrollment-list.component';
import { RegisterComponent } from './../register/register.component';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { TrainingComponent } from '../training/training.component';
import { TrainingEditComponent } from '../training/training-edit/training-edit.component';
import { TrainingCreateComponent } from '../training/training-create/training-create.component';
import { EnrollmentComponent } from '../enrollment/enrollment.component';

const routes: Routes = [
    // Home
    { path: '', component: HomeComponent, canActivate: [AuthenticationGuard] },

    // Login
    { path: 'login', component: LoginComponent},

    // Register
    { path: 'register', component: RegisterComponent },

    // Trainings
    { path: 'trainings', component: TrainingComponent, canActivate: [AuthenticationGuard] },
    { path: 'trainings/training-edit/:id',
        component: TrainingEditComponent,
        canActivate: [AuthenticationGuard],
        data: { expectedRole: 'ADMIN' }  },
    { path: 'trainings/training-create',
        component: TrainingCreateComponent,
        canActivate: [AuthenticationGuard],
        data: { expectedRole: 'ADMIN' }},

    // Enrollments
    { path: 'enrollments/enrollment-create', component: EnrollmentComponent },
    { path: 'enrollments/enrollment-list', component: EnrollmentListComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule { }
