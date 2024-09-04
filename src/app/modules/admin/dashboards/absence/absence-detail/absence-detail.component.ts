import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AbsenceService } from '../absence.service';
import { Absence } from '../absence.model';

@Component({
  selector: 'app-absence-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './absence-detail.component.html',
})
export class AbsenceDetailComponent {
  absence?: Absence;

  constructor(
    private route: ActivatedRoute,
    private absenceService: AbsenceService
  ) {
    const id = this.route.snapshot.params['id'];
    this.absenceService.getAbsenceById(id).subscribe((data) => (this.absence = data));
  }
}
