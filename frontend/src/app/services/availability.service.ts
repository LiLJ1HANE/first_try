import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { 
  RoomType,
  AvailabilityReportItem,
  RoomAvailability
} from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  private apiUrl = `${environment.apiUrl}/availability`;

  constructor(private http: HttpClient) {}

  getDailyAvailability(date: Date): Observable<AvailabilityReportItem[]> {
    return this.http.get<AvailabilityReportItem[]>(`${this.apiUrl}/daily`, {
      params: { date: date.toISOString().split('T')[0] }
    });
  }

  getDateRangeAvailability(start: Date, end: Date): Observable<AvailabilityReportItem[]> {
    return this.http.get<AvailabilityReportItem[]>(`${this.apiUrl}/range`, {
      params: {
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0]
      }
    });
  }

  checkRoomAvailability(roomId: number, start: Date, end: Date): Observable<RoomAvailability> {
    return this.http.get<RoomAvailability>(`${this.apiUrl}/room/${roomId}`, {
      params: {
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0]
      }
    });
  }
}