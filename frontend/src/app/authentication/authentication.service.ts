import { Authority } from './../model/authority';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import * as jwt_decode from 'jwt-decode';
import { Member } from '../model/member';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    private loggedIn = new BehaviorSubject<boolean>(false);
    baseUrl = environment.baseUrl;

    get isLoggedIn() {
        const member = JSON.parse(localStorage.getItem('currentMember')) as Member;
        if (member != null) {
            const token = member.token;
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
        return this.http.post<any>(this.baseUrl + '/public/auth', { username: username, password: password })
            .do(receivedToken => {
                const decoded = jwt_decode(receivedToken.token);

                const member = new Member();
                const roleList: Authority[] = [];
                const authorities = decoded.authorities;
                authorities.forEach(authority => {
                    const role = new Authority();
                    role.name = authority;
                    roleList.push(role);
                });
                member.authorities = roleList;
                member.email = decoded.email;
                member.firstname = decoded.firstname;
                member.lastname = decoded.lastname;
                member.id = decoded.id;
                member.token = receivedToken.token;

                // login successful if there's a jwt token in the response
                if (receivedToken && receivedToken.token) {
                    // store member details and jwt token in local storage to keep member logged in between page refreshes
                    this.loggedIn.next(true);
                    localStorage.setItem('currentMember', JSON.stringify(member));
                }
                return member;
            });
    }

    logout() {
        // remove member from local storage to log member out
        console.log('Removing JWT token');
        this.loggedIn.next(false);
        localStorage.removeItem('currentMember');
    }

    isAdmin(): boolean {
        const member = JSON.parse(localStorage.getItem('currentMember')) as Member;
        let found = false;
        if (member != null) {
            member.authorities.forEach(auth => {
                if (auth.name === 'ROLE_ADMIN') {
                    found = true;
                }
            } );
        }
        return found;
    }

    isUser(): boolean {
        const member = JSON.parse(localStorage.getItem('currentMember')) as Member;
        let found = false;
        if (member != null) {
            member.authorities.forEach(auth => {
                if (auth.name === 'ROLE_USER') {
                    found = true;
                }
            } );
        }
        return found;
    }

    getMemberId(): number {
        const member = JSON.parse(localStorage.getItem('currentMember')) as Member;
        return member.id;
    }
}
