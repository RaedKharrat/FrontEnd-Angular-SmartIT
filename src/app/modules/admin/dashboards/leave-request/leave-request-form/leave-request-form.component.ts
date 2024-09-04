import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveRequestService } from '../leave-request.service';
import { LeaveRequest, LeaveType } from '../leave-request.model';

@Component({
  selector: 'app-leave-request-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './leave-request-form.component.html',
  styleUrls: ['./leave-request-form.component.scss']
})
export class LeaveRequestFormComponent {
  leaveRequestForm: FormGroup;
  leaveTypes = Object.values(LeaveType);

  constructor(
    private fb: FormBuilder,
    private leaveRequestService: LeaveRequestService,
    private router: Router
  ) {
    this.leaveRequestForm = this.fb.group({
      user: this.fb.group({
        id: [null, Validators.required]
      }),
      type: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      status: ['PENDING'], // Default value
      daysAccrued: [0, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.leaveRequestForm.valid) {
      const newRequest: LeaveRequest = this.leaveRequestForm.value;
      console.log('Submitting Leave Request:', newRequest);
      this.leaveRequestService.create(newRequest).subscribe({
        next: () => this.router.navigate(['/leave-requests']),
        error: (err) => console.error('Error:', err)
      });
    }
  }
}
