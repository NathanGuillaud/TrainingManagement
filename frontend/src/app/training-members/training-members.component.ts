import { Training } from './../model/training';
import { AlertService } from './../alert/alert.service';
import { TrainingService } from './../training/training.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Member } from '../model/member';

@Component({
  selector: 'app-training-members',
  templateUrl: './training-members.component.html',
  styleUrls: ['./training-members.component.css']
})
export class TrainingMembersComponent implements OnInit {

  trainingMembers: Member[] = [];
  trainingMembersCount: number;
  currentTrainingName: string;
  // propriétés pour la pagination
  currentPage = 1;
  itemsPerPage = 4;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private trainingService: TrainingService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getTrainingName();
    this.getMembersByTrainingId(this.route.snapshot.params.id, 0, this.itemsPerPage);
  }

  getMembersByTrainingId(id: number, offset: number, limit: number) {
    this.trainingService.getAllMembersByTrainingId(id, offset, limit)
      .subscribe(
        results => {
          this.trainingMembers = results['members'];
          this.trainingMembersCount = results['membersCount'];
        });
  }

  getPage(page: number) {
    this.currentPage = page;
    this.getMembersByTrainingId(this.route.snapshot.params.id, (this.currentPage - 1) * this.itemsPerPage, this.itemsPerPage);
  }

  getTrainingName() {
    this.trainingService.getTraining(this.route.snapshot.params.id).subscribe(
      training => {
        this.currentTrainingName = training.name;
      });
  }

}
