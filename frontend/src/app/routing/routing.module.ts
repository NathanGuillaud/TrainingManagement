import { RegisterComponent } from './../register/register.component';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { TrainingComponent } from '../training/training.component';
import { TrainingEditComponent } from '../training/training-edit/training-edit.component';
import { TrainingCreateComponent } from '../training/training-create/training-create.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthenticationGuard] },
    { path: 'login', component: LoginComponent},
    { path: 'trainings', component: TrainingComponent, canActivate: [AuthenticationGuard] },
    { path: 'trainings/training-edit/:id',
        component: TrainingEditComponent,
        canActivate: [AuthenticationGuard],
        data: { expectedRole: 'ADMIN' }  },
    { path: 'trainings/training-create',
        component: TrainingCreateComponent,
        canActivate: [AuthenticationGuard],
        data: { expectedRole: 'ADMIN' }},
    { path: 'register', component: RegisterComponent },
//
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule { }
