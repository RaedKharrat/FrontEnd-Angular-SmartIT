// leave-request.model.ts
export interface LeaveRequest {
  id?: number; // Optional if not always available
  user: {
    id: number;
  };
  type: LeaveType;
  startDate: string; // Dates as ISO strings
  endDate: string;
  status: LeaveStatus;
  daysAccrued: number;
}

export enum LeaveType {
  ANNUAL = 'ANNUAL',
  SICK = 'SICK',
  UNPAID = 'UNPAID'
}

export enum LeaveStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}
