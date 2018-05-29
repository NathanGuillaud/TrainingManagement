import { AlertService } from './../alert/alert.service';
import { MemberService } from './../member/member.service';
import { Member } from './../model/member';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  member: Member = new Member();
  loading = false;

  constructor(
        private router: Router,
        private memberService: MemberService,
        private alertService: AlertService) { }

register() {
  this.loading = true;
  this.memberService.create(this.member)
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
