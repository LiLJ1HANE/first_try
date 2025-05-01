import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  Room,
  RoomType,
  RoomAvailability,
  AvailabilityReportItem
} from '../interfaces/room.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = `${environment.apiUrl}/rooms`;
  
  // Mock data with quantities for each room type
  private roomQuantities: {[key in RoomType]: number} = {
    'Standard': 15,
    'Deluxe': 10,
    'Suite Familiale': 5
  };

  constructor(private http: HttpClient) {}

  // Basic room methods
  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl);
  }

  getRoomById(id: number): Observable<Room | null> {
    return this.http.get<Room | null>(`${this.apiUrl}/${id}`);
  }

  // Availability methods
  checkRoomAvailability(roomId: number, checkIn: Date, checkOut: Date): Observable<RoomAvailability> {
    return this.http.get<RoomAvailability>(`${this.apiUrl}/${roomId}/availability`, {
      params: {
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString()
      }
    });
  }

  getAvailabilityReport(startDate: Date, endDate: Date): Observable<AvailabilityReportItem[]> {
    return this.http.get<AvailabilityReportItem[]>(`${this.apiUrl}/availability-report`, {
      params: {
        start: startDate.toISOString(),
        end: endDate.toISOString()
      }
    });
  }

  getRoomTypeAvailability(roomType: RoomType, checkIn: Date, checkOut: Date): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/type-availability`, {
      params: {
        type: roomType,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString()
      }
    });
  }

  // Helper method to get quantity for room type
  getRoomTypeQuantity(type: RoomType): number {
    return this.roomQuantities[type];
  }
}