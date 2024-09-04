import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StageRequestService } from '../stage-request.service';
import { StageRequest } from '../stage-request.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stage-request-detail',
  templateUrl: './stage-request-detail.component.html',
  styleUrls: ['./stage-request-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class StageRequestDetailComponent implements OnInit {
  stageRequest: StageRequest | undefined;

  constructor(
    private route: ActivatedRoute,
    private stageRequestService: StageRequestService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.stageRequestService.getStageRequestById(+id).subscribe(data => {
        this.stageRequest = data;
      });
    }
  }
}
