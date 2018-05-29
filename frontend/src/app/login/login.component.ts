import { Member } from './../model/member';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../alert/alert.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    member: any = {};
  loading = false;
  returnUrl: string;
  loggedMember: Member = new Member();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.member.username, this.member.password)
            .subscribe(
                member => {
                    this.member = member;
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error.status, error.error.message);
                    this.loading = false;
                });
    }
}
