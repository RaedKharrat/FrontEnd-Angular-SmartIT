import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LeaveRequestService } from '../leave-request.service';
import { LeaveRequest } from '../leave-request.model';

@Component({
  selector: 'app-leave-request-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './leave-request-list.component.html',
  styleUrls: ['./leave-request-list.component.scss']
})
export class LeaveRequestListComponent implements OnInit {
  leaveRequests: LeaveRequest[] = [];
  displayedColumns: string[] = ['userId', 'type', 'startDate', 'endDate', 'status', 'actions'];

  constructor(private leaveRequestService: LeaveRequestService, private router: Router) {}

  ngOnInit(): void {
    this.leaveRequestService.getAll().subscribe(requests => {
      this.leaveRequests = requests;
    });
  }

  viewDetails(id: number): void {
    this.router.navigate([`/leave-requests/${id}`]);
  }

  delete(id: number): void {
    this.leaveRequestService.delete(id).subscribe(() => {
      this.leaveRequests = this.leaveRequests.filter(request => request.id !== id);
    });
  }
}
