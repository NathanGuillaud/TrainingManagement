import { AlertService } from './../alert/alert.service';
import { UserService } from './../user/user.service';
import { User } from './../model/user';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User();
  loading = false;

  constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

register() {
  this.loading = true;
  this.userService.create(this.user)
      .subscribe(
          data => {
              // set success message and pass true paramater to persist the message after redirecting to the login page
              this.alertService.success(200, 'Création de compte effectuée.', true);
              this.router.navigate(['/login']);
          },
          error => {
            console.log(error);
            this.alertService.error(error.status, error.error.message);
            this.loading = false;
          });
}
}
