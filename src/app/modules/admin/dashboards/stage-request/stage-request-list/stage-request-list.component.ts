import { Component, OnInit } from '@angular/core';
import { StageRequestService } from '../stage-request.service';
import { StageRequest } from '../stage-request.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stage-request-list',
  templateUrl: './stage-request-list.component.html',
  styleUrls: ['./stage-request-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class StageRequestListComponent implements OnInit {
  stageRequests: StageRequest[] = [];

  constructor(private stageRequestService: StageRequestService) {}

  ngOnInit(): void {
    this.stageRequestService.getAllStageRequests().subscribe(data => {
      this.stageRequests = data;
    });
  }
}
