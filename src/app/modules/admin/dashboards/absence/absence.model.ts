export interface Absence {
    id?: number;
    user: { id: number; username?: string }; // Modify based on User model
    absenceDate: string;
  }
  