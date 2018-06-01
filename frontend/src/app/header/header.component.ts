import { AuthenticationService } from './../authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  isLoggedIn: boolean;
  isAdmin: boolean;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(value => this.isLoggedIn = value);
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isAdmin = this.authService.isAdmin();
  }
}
