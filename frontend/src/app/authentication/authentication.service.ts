import { Authority } from './../model/authority';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import * as jwt_decode from 'jwt-decode';
import { User } from '../model/user';

@Injectable()
export class AuthenticationService {
    private loggedIn = new BehaviorSubject<boolean>(false);

    get isLoggedIn() {
        const user = JSON.parse(localStorage.getItem('currentUser')) as User;
        if (user != null) {
            const token = user.token;
            const expiredTime = jwt_decode(token).exp;
            const currentTime = new Date().getTime() / 1000;
            if (currentTime < expiredTime) {
                this.loggedIn.next(true);
            } else {
                this.loggedIn.next(false);
            }
        }
       return this.loggedIn.asObservable();
    }

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>('http://localhost:8080/api/public/auth', { username: username, password: password })
            .do(receivedToken => {
                const decoded = jwt_decode(receivedToken.token);

                const user = new User();
                const roleList: Authority[] = [];
                const authorities = decoded.authorities;
                authorities.forEach(authority => {
                    const role = new Authority();
                    role.name = authority;
                    roleList.push(role);
                });
                user.authorities = roleList;
                user.email = decoded.email;
                user.firstname = decoded.firstname;
                user.lastname = decoded.lastname;
                user.id = decoded.id;
                user.token = receivedToken.token;

                // login successful if there's a jwt token in the response
                if (receivedToken && receivedToken.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.loggedIn.next(true);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        console.log('Removing JWT token');
        this.loggedIn.next(false);
        localStorage.removeItem('currentUser');
    }

    isAdmin(): boolean {
        const user = JSON.parse(localStorage.getItem('currentUser')) as User;
        let found = false;
        if (user != null) {
            user.authorities.forEach(auth => {
                if (auth.name === 'ROLE_ADMIN') {
                    found = true;
                }
            } );
        }
        return found;
    }

    isUser(): boolean {
        const user = JSON.parse(localStorage.getItem('currentUser')) as User;
        let found = false;
        if (user != null) {
           user.authorities.forEach(auth => {
                if (auth.name === 'ROLE_USER') {
                    found = true;
                }
            } );
        }
        return found;
    }

    getUserId(): number {
        const user = JSON.parse(localStorage.getItem('currentUser')) as User;
        return user.id;
    }
}
