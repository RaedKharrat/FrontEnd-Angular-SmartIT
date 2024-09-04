// stage-request.model.ts

export enum StageStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
  }
  
  export interface User {
    id: number;
    username: string;
    // Add other relevant user properties based on your backend model
  }
  
  export interface StageRequest {
    id: number;
    user: User;
    cvUrl: string;
    status: StageStatus;
  }
  