import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AbsenceService } from '../absence.service';
import { Absence } from '../absence.model';

@Component({
  selector: 'app-absence-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './absence-list.component.html',
  styleUrls: ['./absence-list.component.scss']
})
export class AbsenceListComponent implements OnInit {
  absences: Absence[] = [];
  displayedColumns: string[] = ['absenceDate', 'user', 'actions'];

  constructor(private absenceService: AbsenceService) {}

  ngOnInit() {
    this.absenceService.getAllAbsences().subscribe((data) => (this.absences = data));
  }

  deleteAbsence(id: number) {
    if (confirm('Are you sure you want to delete this absence?')) {
      this.absenceService.deleteAbsence(id).subscribe(() => {
        this.absences = this.absences.filter(absence => absence.id !== id);
      });
    }
  }
}
