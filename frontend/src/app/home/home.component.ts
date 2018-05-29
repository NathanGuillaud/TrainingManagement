import { AlertService } from './../alert/alert.service';
import { Component, OnInit } from '@angular/core';
import { Member } from '../model/member';
import { MemberService } from '../member/member.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    currentMember: Member = new Member();
    members: Member[] = [];

    constructor(
        private memberService: MemberService,
        private alertService: AlertService) {
        this.currentMember = JSON.parse(localStorage.getItem('currentMember'));
    }

    ngOnInit() {
    }

    private loadAllMembers() {
        this.memberService.getAll().subscribe(members => { this.members = members; },
            error => {
              this.alertService.error(error.status, error.error.message);
          });
    }
}
