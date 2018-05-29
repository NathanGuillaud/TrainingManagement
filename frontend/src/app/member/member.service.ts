import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Member } from '../model/member';
import { environment } from '../../environments/environment';

@Injectable()
export class MemberService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Member[]>(this.baseUrl + '/private/members');
    }

    create(member: Member) {
        return this.http.post(this.baseUrl + '/public/signup', member);
    }

    // getById(id: number) {
    //     return this.http.get(this.baseUrl + '/private/members/' + id);
    // }

    // update(member: Member) {
    //     return this.http.put(this.baseUrl + '/private/members' + member.id, member);
    // }

    // delete(id: number) {
    //     return this.http.delete(this.baseUrl + '/private/members' + id);
    // }

}
