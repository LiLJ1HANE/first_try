import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { Room } from '../interfaces/room.interface';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="rooms-container">
      <div class="search-section">
        <input 
          type="text" 
          [(ngModel)]="searchQuery" 
          (input)="onSearch()"
          placeholder="Rechercher une chambre..."
          class="search-input"
        >
        <select [(ngModel)]="selectedCapacity" (change)="onSearch()" class="capacity-select">
          <option value="">Toutes capacités</option>
          <option value="1">1 personne</option>
          <option value="2">2 personnes</option>
          <option value="4">4 personnes</option>
        </select>
      </div>

      <div class="rooms-grid">
        <div *ngFor="let room of rooms" class="room-card">
          <img [src]="room.imageUrl" [alt]="room.name" class="room-image">
          <div class="room-info">
            <h3>{{ room.name }}</h3>
            <p>{{ room.description }}</p>
            <div class="room-details">
              <span>Capacité: {{ room.capacity }} personne(s)</span>
              <span>{{ room.price }}MAD / nuit</span>
            </div>
            <div class="amenities">
              <span *ngFor="let amenity of room.amenities" class="amenity-tag">
                {{ amenity }}
              </span>
            </div>
            <button 
              (click)="viewRoom(room.id)" 
              class="view-button"
              [disabled]="!room.available"
            >
              {{ room.available ? 'Voir les détails' : 'Non disponible' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .rooms-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .search-section {
      margin-bottom: 20px;
      display: flex;
      gap: 10px;
    }

    .search-input, .capacity-select {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
    }

    .search-input {
      flex: 1;
    }

    .rooms-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .room-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .room-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .room-info {
      padding: 15px;
    }

    .room-info h3 {
      margin: 0 0 10px 0;
      color: #333;
    }

    .room-details {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      color: #666;
    }

    .amenities {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin: 10px 0;
    }

    .amenity-tag {
      background: #f0f0f0;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.9rem;
      color: #666;
    }

    .view-button {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .view-button:hover {
      background-color: #0056b3;
    }

    .view-button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  searchQuery: string = '';
  selectedCapacity: string = '';

  constructor(
    private roomService: RoomService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadRooms();
  }

  loadRooms() {
    this.roomService.getRooms().subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  onSearch() {
    const capacity = this.selectedCapacity ? parseInt(this.selectedCapacity) : undefined;
    this.roomService.searchRooms(this.searchQuery, capacity).subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  viewRoom(id: number) {
    this.router.navigate(['/room', id]);
  }
}
