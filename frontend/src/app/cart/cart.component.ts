import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { RoomBooking } from '../interfaces/room.interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cart-container">
      <h2>Panier</h2>
      
      <div *ngIf="bookings.length === 0" class="empty-cart">
        <p>Votre panier est vide</p>
        <button (click)="navigateToRooms()" class="browse-button">
          Parcourir les chambres
        </button>
      </div>

      <div *ngIf="bookings.length > 0" class="cart-content">
        <div class="booking-items">
          <div *ngFor="let booking of bookings" class="booking-item">
            <div class="booking-details">
              <h3>{{ booking.roomName }}</h3>
              <p class="room-type">{{ booking.roomType }}</p>
              
              <div class="edit-dates">
                <div class="date-input">
                  <label>Date d'arrivée</label>
                  <input 
                    type="date" 
                    [(ngModel)]="booking.checkIn"
                    (change)="updateBooking(booking)"
                    [min]="today"
                  >
                </div>
                <div class="date-input">
                  <label>Date de départ</label>
                  <input 
                    type="date" 
                    [(ngModel)]="booking.checkOut"
                    (change)="updateBooking(booking)"
                    [min]="getMinCheckOut(booking.checkIn)"
                  >
                </div>
                <div class="guest-input">
                  <label>Personnes</label>
                  <select [(ngModel)]="booking.guestCount" (change)="updateBooking(booking)">
                    <option [value]="n" *ngFor="let n of [1,2,3,4]">{{ n }}</option>
                  </select>
                </div>
              </div>

              <p>{{ booking.numberOfNights }} nuit(s) x {{ booking.basePrice / booking.numberOfNights }}MAD</p>
            </div>
            <div class="booking-price">
              <p>Sous-total: {{ booking.basePrice }}MAD</p>
              <p>TVA (20%): {{ booking.basePrice * booking.taxRate }}MAD</p>
              <p class="total">Total: {{ booking.totalPrice }}MAD</p>
            </div>
            <button 
              (click)="removeBooking(booking.roomId)" 
              class="remove-button"
            >
              Supprimer
            </button>
          </div>
        </div>

        <div class="cart-summary">
          <h3>Récapitulatif</h3>
          <div class="summary-details">
            <p>Total: {{ getTotal() }}MAD</p>
          </div>
          <button (click)="checkout()" class="checkout-button">
            Valider et payer
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-container {
      padding: 20px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .empty-cart {
      text-align: center;
      padding: 40px;
    }

    .browse-button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .cart-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
    }

    .booking-item {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 15px;
      background: white;
    }

    .booking-details h3 {
      margin: 0 0 5px 0;
      color: #333;
    }

    .room-type {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 15px;
    }

    .edit-dates {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin: 15px 0;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 5px;
    }

    .date-input, .guest-input {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .date-input label, .guest-input label {
      font-size: 0.9rem;
      color: #666;
    }

    .date-input input, .guest-input select {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .booking-price {
      margin: 10px 0;
      padding-top: 10px;
      border-top: 1px solid #eee;
    }

    .booking-price p {
      margin: 5px 0;
    }

    .total {
      font-weight: bold;
      color: #007bff;
    }

    .remove-button {
      padding: 5px 10px;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
    }

    .cart-summary {
      background: white;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #ddd;
      height: fit-content;
    }

    .summary-details {
      margin: 15px 0;
    }

    .checkout-button {
      width: 100%;
      padding: 10px;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1.1rem;
    }

    .checkout-button:hover {
      background-color: #218838;
    }

    @media (max-width: 768px) {
      .cart-content {
        grid-template-columns: 1fr;
      }

      .edit-dates {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  bookings: RoomBooking[] = [];
  today = new Date().toISOString().split('T')[0];

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.bookings$.subscribe(bookings => {
      this.bookings = bookings;
    });
  }

  getMinCheckOut(checkIn: Date): string {
    const date = new Date(checkIn);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  }

  updateBooking(booking: RoomBooking) {
    const start = new Date(booking.checkIn);
    const end = new Date(booking.checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    if (nights > 0) {
      const pricePerNight = booking.basePrice / booking.numberOfNights;
      const newBooking: RoomBooking = {
        ...booking,
        checkIn: start,
        checkOut: end,
        numberOfNights: nights,
        basePrice: nights * pricePerNight,
        taxRate: 0.2
      };
      newBooking.totalPrice = newBooking.basePrice + (newBooking.basePrice * newBooking.taxRate);
      this.cartService.updateBooking(newBooking);
    }
  }

  removeBooking(roomId: number) {
    this.cartService.removeBooking(roomId);
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  navigateToRooms() {
    this.router.navigate(['/rooms']);
  }

  checkout() {
    // Implement checkout logic here
    console.log('Proceeding to checkout...');
  }
}