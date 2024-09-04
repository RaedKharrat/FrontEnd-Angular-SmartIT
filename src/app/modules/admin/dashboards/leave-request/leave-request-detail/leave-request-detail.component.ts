import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveRequestService } from '../leave-request.service';
import { LeaveRequest } from '../leave-request.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-leave-request-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './leave-request-detail.component.html',
  styleUrls: ['./leave-request-detail.component.scss']
})
export class LeaveRequestDetailComponent implements OnInit {
  leaveRequest!: LeaveRequest;

  constructor(
    private leaveRequestService: LeaveRequestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.leaveRequestService.getById(id).subscribe(request => {
      this.leaveRequest = request;
    });
  }

  approve(): void {
    if (this.leaveRequest.id) {
      this.leaveRequestService.approve(this.leaveRequest.id).subscribe(() => {
        this.router.navigate(['/leave-requests']);
      });
    }
  }

  reject(): void {
    if (this.leaveRequest.id) {
      this.leaveRequestService.reject(this.leaveRequest.id).subscribe(() => {
        this.router.navigate(['/leave-requests']);
      });
    }
  }
}
