import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StageRequest } from './stage-request.model';

@Injectable({
  providedIn: 'root'
})
export class StageRequestService {
  private apiUrl = 'http://localhost:8080/api/stagerequests'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getAllStageRequests(): Observable<StageRequest[]> {
    return this.http.get<StageRequest[]>(this.apiUrl);
  }

  getStageRequestById(id: number): Observable<StageRequest> {
    return this.http.get<StageRequest>(`${this.apiUrl}/${id}`);
  }

  createStageRequest(stageRequest: StageRequest): Observable<StageRequest> {
    return this.http.post<StageRequest>(this.apiUrl, stageRequest);
  }

  approveStageRequest(id: number): Observable<StageRequest> {
    return this.http.put<StageRequest>(`${this.apiUrl}/approve/${id}`, null);
  }

  rejectStageRequest(id: number): Observable<StageRequest> {
    return this.http.put<StageRequest>(`${this.apiUrl}/reject/${id}`, null);
  }

  deleteStageRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
