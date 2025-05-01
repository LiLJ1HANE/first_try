import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { AvailabilityService } from '../services/availability.service';
import { 
  Room, 
  RoomType,
  RoomAvailability
} from '../interfaces/room.interface';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  filteredRooms: Room[] = [];
  roomTypes: RoomType[] = ['Standard', 'Deluxe', 'Suite Familiale'];
  selectedType: string = 'all';
  roomAvailability: {[key: number]: RoomAvailability} = {};
  loadingAvailability: boolean = false;

  constructor(
    private roomService: RoomService,
    private availabilityService: AvailabilityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.roomService.getRooms().subscribe({
      next: (rooms: Room[]) => {
        this.rooms = rooms;
        this.filteredRooms = [...this.rooms];
        this.checkInitialAvailability();
      },
      error: (err: Error) => {
        console.error('Error loading rooms:', err);
      }
    });
  }

  checkInitialAvailability(): void {
    this.loadingAvailability = true;
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const availabilityChecks = this.rooms.map((room: Room) => {
      return this.availabilityService.checkRoomAvailability(
        room.id, 
        today, 
        tomorrow
      ).subscribe({
        next: (availability: RoomAvailability) => {
          this.roomAvailability[room.id] = availability;
        },
        error: (err: Error) => {
          console.error(`Error checking availability for room ${room.id}:`, err);
          this.roomAvailability[room.id] = {
            isAvailable: false,
            availableRooms: 0
          };
        }
      });
    });

    // When all observables complete
    Promise.all(availabilityChecks)
      .finally(() => {
        this.loadingAvailability = false;
      });
  }

  filterRooms(): void {
    if (this.selectedType === 'all') {
      this.filteredRooms = [...this.rooms];
    } else {
      this.filteredRooms = this.rooms.filter(
        (room: Room) => room.type === this.selectedType
      );
    }
  }

  navigateToDetail(roomId: number): void {
    this.router.navigate(['/rooms', roomId]);
  }

  getAvailabilityText(roomId: number): string {
    const availability = this.roomAvailability[roomId];
    if (!availability) return 'Chargement...';
    return availability.availableRooms > 0 
      ? `${availability.availableRooms} disponible(s)` 
      : 'Complet';
  }

  isRoomAvailable(roomId: number): boolean {
    const availability = this.roomAvailability[roomId];
    return availability ? availability.isAvailable : false;
  }
}