import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Room, RoomBooking } from '../interfaces/room.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = `${environment.apiUrl}/rooms`;
  private rooms: Room[] = [
    {
      id: 1,
      type: 'Suite Familiale',
      name: 'Suite Vue Ville',
      description: 'Magnifique suite avec vue panoramique sur la ville. Profitez d\'un espace généreux et d\'un confort optimal avec des équipements haut de gamme.',
      price: 2500,
      capacity: 4,
      amenities: ['Wi-Fi gratuit', 'Climatisation', 'Mini-bar', 'Coffre-fort', 'Room service 24/7', 'TV LED 55"', 'Bureau de travail'],
      imageUrl: 'assets/images/room1.jpg',
      available: true
    },
    {
      id: 2,
      type: 'Deluxe',
      name: 'Chambre Deluxe Vue Mer',
      description: 'Chambre luxueuse offrant une vue imprenable sur l\'océan. Design moderne et élégant avec des finitions de haute qualité.',
      price: 1800,
      capacity: 2,
      amenities: ['Vue sur mer', 'Balcon privé', 'Wi-Fi gratuit', 'Climatisation', 'Mini-bar', 'Service de conciergerie'],
      imageUrl: 'assets/images/room2.jpg',
      available: true
    },
    {
      id: 3,
      type: 'Suite Familiale',
      name: 'Suite Jacuzzi Privé',
      description: 'Suite romantique avec jacuzzi privé. Parfaite pour les couples en quête d\'une expérience unique et luxueuse.',
      price: 3000,
      capacity: 2,
      amenities: ['Jacuzzi privé', 'Éclairage d\'ambiance', 'Wi-Fi gratuit', 'Mini-bar premium', 'Room service 24/7', 'Lit King size'],
      imageUrl: 'assets/images/room3.jpg',
      available: true
    },
    {
      id: 4,
      type: 'Deluxe',
      name: 'Chambre Deluxe Montagne',
      description: 'Vue spectaculaire sur les montagnes depuis cette chambre deluxe spacieuse. Parfaite pour les amateurs de paysages naturels.',
      price: 2200,
      capacity: 3,
      amenities: ['Vue montagne', 'Wi-Fi gratuit', 'Climatisation', 'Mini-bar', 'Bureau spacieux', 'Room service'],
      imageUrl: 'assets/images/room4.jpg',
      available: true
    },
    {
      id: 5,
      type: 'Suite Familiale',
      name: 'Suite Executive',
      description: 'Suite executive avec espace de travail dédié et vue panoramique sur la ville. Idéale pour les voyageurs d\'affaires.',
      price: 2800,
      capacity: 2,
      amenities: ['Bureau executive', 'Wi-Fi haut débit', 'Machine à café', 'Mini-bar premium', 'Service de pressing', 'Salle de réunion sur demande'],
      imageUrl: 'assets/images/room5.jpg',
      available: true
    }
  ];

  constructor(private http: HttpClient) {}

  getRooms(): Observable<Room[]> {
    return of(this.rooms);
  }

  getRoomById(id: number): Observable<Room | null> {
    const room = this.rooms.find(r => r.id === id);
    return of(room || null);
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