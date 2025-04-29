import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room, RoomBooking } from '../interfaces/room.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = `${environment.apiUrl}/rooms`;

  constructor(private http: HttpClient) {}

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl);
  }

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/${id}`);
  }

  searchRooms(query: string, capacity?: number): Observable<Room[]> {
    let url = `${this.apiUrl}/search?query=${query}`;
    if (capacity) {
      url += `&capacity=${capacity}`;
    }
    return this.http.get<Room[]>(url);
  }

  bookRoom(booking: RoomBooking): Observable<any> {
    return this.http.post(`${this.apiUrl}/book`, booking);
  }

  checkAvailability(roomId: number, checkIn: Date, checkOut: Date): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${roomId}/availability`, {
      params: {
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString()
      }
    });
  }
}