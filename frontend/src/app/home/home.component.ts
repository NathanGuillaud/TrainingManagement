import { AlertService } from './../alert/alert.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    currentUser: User = new User();
    users: User[] = [];

    constructor(
        private userService: UserService,
        private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; },
            error => {
              this.alertService.error(error.status, error.error.message);
          });
    }
}
