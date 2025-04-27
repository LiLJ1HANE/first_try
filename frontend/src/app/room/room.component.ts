import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Room, ReservationRequest, ApiResponse } from '../interfaces/room.interface';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  rooms: Room[] = [];
  selectedRoom: Room | null = null;
  reservationData: ReservationRequest = {
    room_id: 0,
    check_in: '',
    check_out: '',
    guest_name: ''
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.apiService.getRooms().subscribe({
      next: (response: ApiResponse<Room[]>) => {
        if (response.data) {
          this.rooms = response.data;
        }
      },
      error: (err: Error) => console.error('Error loading rooms:', err.message)
    });
  }

  reserveRoom(): void {
    if (!this.selectedRoom) return;

    this.reservationData.room_id = this.selectedRoom.id;
    
    this.apiService.reserveRoom(this.reservationData).subscribe({
      next: (response: ApiResponse<any>) => {
        if (response.message) {
          alert(response.message);
          this.loadRooms();
        }
      },
      error: (err: Error) => {
        console.error('Reservation error:', err.message);
        alert('Erreur lors de la réservation');
      }
    });
  }
}