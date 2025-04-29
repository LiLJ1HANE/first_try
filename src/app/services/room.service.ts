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

  // Données mock pour le développement
  private mockRooms: Room[] = [
    {
      id: 1,
      type: 'Standard',
      name: 'Chambre Standard',
      description: 'Une chambre confortable avec lit double, salle de bain privée et vue sur la ville.',
      price: 120,
      capacity: 2,
      amenities: ['Wi-Fi', 'TV', 'Climatisation', 'Petit-déjeuner'],
      imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304',
      available: true
    },
    {
      id: 2,
      type: 'Deluxe',
      name: 'Chambre Deluxe',
      description: 'Une chambre spacieuse avec lit king-size, salle de bain luxueuse et vue sur la mer.',
      price: 200,
      capacity: 2,
      amenities: ['Wi-Fi', 'TV écran plat', 'Climatisation', 'Mini-bar', 'Petit-déjeuner'],
      imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39',
      available: true
    },
    {
      id: 3,
      type: 'Suite Familiale',
      name: 'Suite Familiale',
      description: 'Une suite spacieuse avec deux chambres, parfaite pour les familles.',
      price: 300,
      capacity: 4,
      amenities: ['Wi-Fi', '2 TV', 'Climatisation', 'Espace salon', 'Petit-déjeuner'],
      imageUrl: 'https://images.unsplash.com/photo-1591088398332-8a7791972843',
      available: true
    }
  ];

  constructor(private http: HttpClient) {}

  getRooms(): Observable<Room[]> {
    // En développement, retourner les données mock
    if (!environment.production) {
      return of(this.mockRooms);
    }
    return this.http.get<Room[]>(this.apiUrl);
  }

  getRoomById(id: number): Observable<Room> {
    // En développement, retourner les données mock
    if (!environment.production) {
      const room = this.mockRooms.find(r => r.id === id);
      if (room) {
        return of(room);
      }
    }
    return this.http.get<Room>(`${this.apiUrl}/${id}`);
  }

  searchRooms(query: string, capacity?: number): Observable<Room[]> {
    // En développement, filtrer les données mock
    if (!environment.production) {
      let filteredRooms = this.mockRooms;
      
      if (query) {
        const searchQuery = query.toLowerCase();
        filteredRooms = filteredRooms.filter(room => 
          room.name.toLowerCase().includes(searchQuery) ||
          room.description.toLowerCase().includes(searchQuery)
        );
      }

      if (capacity) {
        filteredRooms = filteredRooms.filter(room => room.capacity >= capacity);
      }

      return of(filteredRooms);
    }

    let url = `${this.apiUrl}/search?query=${query}`;
    if (capacity) {
      url += `&capacity=${capacity}`;
    }
    return this.http.get<Room[]>(url);
  }

  bookRoom(booking: RoomBooking): Observable<any> {
    if (!environment.production) {
      // Simuler une réservation réussie
      return of({ success: true, booking });
    }
    return this.http.post(`${this.apiUrl}/book`, booking);
  }

  checkAvailability(roomId: number, checkIn: Date, checkOut: Date): Observable<boolean> {
    if (!environment.production) {
      // Simuler une vérification de disponibilité
      return of(true);
    }
    return this.http.get<boolean>(`${this.apiUrl}/${roomId}/availability`, {
      params: {
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString()
      }
    });
  }
} 