import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { CartService } from '../services/cart.service';
import { Room, RoomBooking } from '../interfaces/room.interface';

@Component({
  selector: 'app-room-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="room-detail-container" *ngIf="room">
      <div class="room-images">
        <img [src]="room.imageUrl" [alt]="room.name" class="main-image">
      </div>

      <div class="room-info">
        <h1>{{ room.name }}</h1>
        <p class="description">{{ room.description }}</p>
        
        <div class="amenities-section">
          <h2>Équipements</h2>
          <div class="amenities-grid">
            <div *ngFor="let amenity of room.amenities" class="amenity-item">
              <span class="amenity-icon">✓</span>
              {{ amenity }}
            </div>
          </div>
        </div>

        <div class="price-section">
          <div class="price-info">
            <span class="price">{{ room.price }} MAD</span>
            <span class="per-night">/ nuit</span>
          </div>
          <span class="capacity">Capacité: {{ room.capacity }} personne(s)</span>
        </div>

        <div class="booking-form" *ngIf="room.available">
          <h2>Réserver cette chambre</h2>
          <div class="form-grid">
            <div class="form-group">
              <label for="checkIn">Date d'arrivée</label>
              <input 
                type="date" 
                id="checkIn" 
                [(ngModel)]="checkIn"
                [min]="today"
                (change)="calculateNights()"
              >
            </div>

            <div class="form-group">
              <label for="checkOut">Date de départ</label>
              <input 
                type="date" 
                id="checkOut" 
                [(ngModel)]="checkOut"
                [min]="minCheckOut"
                (change)="calculateNights()"
              >
            </div>

            <div class="form-group">
              <label for="guests">Nombre de personnes</label>
              <select id="guests" [(ngModel)]="guestCount">
                <option *ngFor="let n of guestOptions" [value]="n">{{ n }}</option>
              </select>
            </div>
          </div>

          <div class="booking-summary" *ngIf="numberOfNights > 0">
            <div class="summary-row">
              <span>{{ numberOfNights }} nuit(s) x {{ room.price }} MAD</span>
              <span>{{ basePrice }} MAD</span>
            </div>
            <div class="summary-row">
              <span>TVA (20%)</span>
              <span>{{ taxAmount }} MAD</span>
            </div>
            <div class="summary-row total">
              <span>Total</span>
              <span>{{ totalPrice }} MAD</span>
            </div>
          </div>

          <button 
            class="book-button" 
            (click)="addToCart()"
            [disabled]="!isValidBooking()"
          >
            Ajouter au panier
          </button>
        </div>

        <div class="not-available" *ngIf="!room.available">
          <p>Cette chambre n'est pas disponible pour le moment.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .room-detail-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }

    .room-images {
      position: sticky;
      top: 20px;
    }

    .main-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 8px;
    }

    .room-info {
      padding: 20px;
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #333;
    }

    .description {
      color: #666;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .amenities-section {
      margin: 2rem 0;
    }

    .amenities-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
      margin-top: 1rem;
    }

    .amenity-item {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #666;
    }

    .amenity-icon {
      color: #28a745;
    }

    .price-section {
      margin: 2rem 0;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .price-info {
      display: flex;
      align-items: baseline;
      gap: 5px;
    }

    .price {
      font-size: 1.8rem;
      font-weight: bold;
      color: #007bff;
    }

    .per-night {
      color: #666;
    }

    .capacity {
      display: block;
      margin-top: 0.5rem;
      color: #666;
    }

    .booking-form {
      margin-top: 2rem;
      padding: 1.5rem;
      border: 1px solid #ddd;
      border-radius: 8px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-bottom: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    label {
      color: #666;
      font-size: 0.9rem;
    }

    input, select {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .booking-summary {
      margin: 1.5rem 0;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      color: #666;
    }

    .total {
      font-weight: bold;
      color: #333;
      border-top: 1px solid #ddd;
      padding-top: 0.5rem;
      margin-top: 0.5rem;
    }

    .book-button {
      width: 100%;
      padding: 1rem;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 1.1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .book-button:hover {
      background-color: #218838;
    }

    .book-button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .not-available {
      margin-top: 1rem;
      padding: 1rem;
      background: #dc3545;
      color: white;
      border-radius: 5px;
      text-align: center;
    }

    @media (max-width: 768px) {
      .room-detail-container {
        grid-template-columns: 1fr;
      }

      .room-images {
        position: static;
      }
    }
  `]
})
export class RoomDetailComponent implements OnInit {
  room: Room | null = null;
  checkIn: string = '';
  checkOut: string = '';
  guestCount: number = 1;
  numberOfNights: number = 0;
  basePrice: number = 0;
  taxAmount: number = 0;
  totalPrice: number = 0;
  today = new Date().toISOString().split('T')[0];
  minCheckOut = '';
  guestOptions: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const roomId = Number(this.route.snapshot.paramMap.get('id'));
    this.roomService.getRoomById(roomId).subscribe(room => {
      if (room) {
        this.room = room;
        this.guestOptions = Array.from({length: room.capacity}, (_, i) => i + 1);
      }
    });
  }

  calculateNights() {
    if (this.checkIn && this.checkOut && this.room) {
      const start = new Date(this.checkIn);
      const end = new Date(this.checkOut);
      this.numberOfNights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      this.basePrice = this.numberOfNights * this.room.price;
      this.taxAmount = this.basePrice * 0.2;
      this.totalPrice = this.basePrice + this.taxAmount;
    }
  }

  isValidBooking(): boolean {
    return !!(
      this.checkIn && 
      this.checkOut && 
      this.numberOfNights > 0 && 
      this.guestCount > 0 &&
      this.room?.available
    );
  }

  addToCart() {
    if (this.room && this.isValidBooking()) {
      const booking: RoomBooking = {
        roomId: this.room.id,
        roomName: this.room.name,
        roomType: this.room.type,
        checkIn: new Date(this.checkIn),
        checkOut: new Date(this.checkOut),
        numberOfNights: this.numberOfNights,
        basePrice: this.basePrice,
        taxRate: 0.2,
        totalPrice: this.totalPrice,
        guestCount: this.guestCount
      };
      
      this.cartService.addBooking(booking);
      this.router.navigate(['/cart']);
    }
  }
}