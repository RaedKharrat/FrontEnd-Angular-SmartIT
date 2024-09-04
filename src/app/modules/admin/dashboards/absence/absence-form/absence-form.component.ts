import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AbsenceService } from '../absence.service';
import { Absence } from '../absence.model';



@Component({
  selector: 'app-absence-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './absence-form.component.html',
})
export class AbsenceFormComponent {
  absenceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private absenceService: AbsenceService
  ) {
    this.absenceForm = this.fb.group({
      userId: [''],
      absenceDate: [''],
    });
  }

  onSubmit() {
    const formValue = this.absenceForm.value;
    const absence: Absence = {
      user: { id: formValue.userId },
      absenceDate: formValue.absenceDate,
    };
    this.absenceService.createAbsence(absence).subscribe(() => {
      // Handle successful creation
    });
  }
}
