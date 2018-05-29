import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Member } from '../model/member';

@Injectable()
export class MemberService {

  constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Member[]>('http://localhost:8080/api/private/members');
    }

    create(member: Member) {
        return this.http.post('http://localhost:8080/api/public/signup', member);
    }

    // getById(id: number) {
    //     return this.http.get('http://localhost:8080/api/private/members/' + id);
    // }

    // update(member: Member) {
    //     return this.http.put('http://localhost:8080/api/private/members' + member.id, member);
    // }

    // delete(id: number) {
    //     return this.http.delete('http://localhost:8080/api/private/members' + id);
    // }

}
