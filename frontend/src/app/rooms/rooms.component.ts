import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { Room } from '../interfaces/room.interface';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rooms-container">
      <h1>Nos Chambres</h1>
      <div class="rooms-grid">
        <div *ngFor="let room of rooms" class="room-card">
          <div class="room-image">
            <img [src]="room.imageUrl" [alt]="room.name">
          </div>
          <div class="room-content">
            <h2>{{ room.name }}</h2>
            <p class="description">{{ room.description }}</p>
            
            <div class="room-info">
              <span class="capacity">Capacité: {{ room.capacity }} personne(s)</span>
              <span class="price">{{ room.price }}MAD / nuit</span>
            </div>

            <div class="amenities">
              <span *ngFor="let amenity of room.amenities.slice(0, 6)" class="amenity-tag">
                {{ amenity }}
              </span>
            </div>

            <button 
              class="details-button" 
              (click)="navigateToDetail(room.id)"
              [class.unavailable]="!room.available"
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
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 2rem;
    }

    .rooms-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      padding: 20px;
    }

    .room-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }

    .room-card:hover {
      transform: translateY(-5px);
    }

    .room-image {
      height: 200px;
      overflow: hidden;
    }

    .room-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .room-card:hover .room-image img {
      transform: scale(1.1);
    }

    .room-content {
      padding: 20px;
    }

    h2 {
      margin: 0 0 10px 0;
      color: #333;
      font-size: 1.5rem;
    }

    .description {
      color: #666;
      margin-bottom: 15px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .room-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    .capacity {
      color: #666;
      font-size: 0.9rem;
    }

    .price {
      color: #007bff;
      font-weight: bold;
      font-size: 1.2rem;
    }

    .amenities {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 15px;
    }

    .amenity-tag {
      background: #f8f9fa;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      color: #666;
    }

    .details-button {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .details-button:hover {
      background-color: #0056b3;
    }

    .details-button.unavailable {
      background-color: #dc3545;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .rooms-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];

  constructor(
    private roomService: RoomService,
    private router: Router
  ) {}

  ngOnInit() {
    this.roomService.getRooms().subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  navigateToDetail(roomId: number) {
    this.router.navigate(['/rooms', roomId]);
  }
}
