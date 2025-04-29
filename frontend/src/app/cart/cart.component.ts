import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { RoomBooking } from '../interfaces/room.interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
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
              <p>Du {{ booking.checkIn | date }} au {{ booking.checkOut | date }}</p>
              <p>{{ booking.numberOfNights }} nuit(s) x {{ booking.basePrice }}MAD</p>
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
      margin: 0 0 10px 0;
      color: #333;
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
  `]
})
export class CartComponent implements OnInit {
  bookings: RoomBooking[] = [];

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.bookings$.subscribe(bookings => {
      this.bookings = bookings;
    });
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