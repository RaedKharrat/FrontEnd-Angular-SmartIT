import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StageRequestService } from '../stage-request.service';
import { StageRequest, StageStatus, User } from '../stage-request.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stage-request-form',
  templateUrl: './stage-request-form.component.html',
  styleUrls: ['./stage-request-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class StageRequestFormComponent {
  stageRequestForm: FormGroup;
  stageStatuses = Object.values(StageStatus);
  users: User[] = [];

  constructor(private fb: FormBuilder, private stageRequestService: StageRequestService) {
    this.stageRequestForm = this.fb.group({
      user: ['', Validators.required],
      cvUrl: ['', Validators.required],
      status: [StageStatus.PENDING, Validators.required]
    });
  }

  submitForm(): void {
    if (this.stageRequestForm.valid) {
      const stageRequest: StageRequest = this.stageRequestForm.value;
      console.log('Submitting stage request:', stageRequest); // Log the payload
      this.stageRequestService.createStageRequest(stageRequest).subscribe({
        next: response => {
          console.log('Stage request created:', response);
          this.stageRequestForm.reset();
        },
        error: err => {
          console.error('Error creating stage request:', err); // Log any error from the backend
        }
      });
    }
  }
  
}
