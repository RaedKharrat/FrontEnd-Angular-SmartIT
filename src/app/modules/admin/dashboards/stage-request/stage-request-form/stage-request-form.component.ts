import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StageRequestService } from '../stage-request.service';
import { StageRequest, StageStatus, User } from '../stage-request.model';

@Component({
  selector: 'app-stage-request-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './stage-request-form.component.html',
  styleUrls: ['./stage-request-form.component.scss']
})
export class StageRequestFormComponent {
  stageRequestForm: FormGroup;
  stageStatuses = Object.values(StageStatus);

  constructor(
    private fb: FormBuilder,
    private stageRequestService: StageRequestService,
    private router: Router
  ) {
    this.stageRequestForm = this.fb.group({
      user: this.fb.group({
        id: [null, Validators.required]
      }),
      cvUrl: ['', Validators.required],
      status: [StageStatus.PENDING, Validators.required]
    });
  }

  // Define the onSubmit method to handle form submission
  onSubmit(): void {
    if (this.stageRequestForm.valid) {
      const newRequest: StageRequest = this.stageRequestForm.value;
      console.log('Submitting Stage Request:', newRequest);
      this.stageRequestService.createStageRequest(newRequest).subscribe({
        next: () => this.router.navigate(['/stage-requests']),
        error: (err) => console.error('Error:', err)
      });
    }
  }
}
