import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoomBooking } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly TAX_RATE = 0.20; // 20% tax rate
  private bookingsSubject = new BehaviorSubject<RoomBooking[]>([]);
  bookings$ = this.bookingsSubject.asObservable();

  constructor() {
    // Récupérer le panier du localStorage au démarrage
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      this.bookingsSubject.next(JSON.parse(savedBookings));
    }
  }

  addBooking(booking: RoomBooking): void {
    const currentBookings = this.bookingsSubject.value;
    const updatedBookings = [...currentBookings, {
      ...booking,
      taxRate: this.TAX_RATE,
      totalPrice: booking.basePrice * (1 + this.TAX_RATE)
    }];
    this.bookingsSubject.next(updatedBookings);
    this.saveToLocalStorage(updatedBookings);
  }

  removeBooking(roomId: number): void {
    const currentBookings = this.bookingsSubject.value;
    const updatedBookings = currentBookings.filter(booking => booking.roomId !== roomId);
    this.bookingsSubject.next(updatedBookings);
    this.saveToLocalStorage(updatedBookings);
  }

  clearCart(): void {
    this.bookingsSubject.next([]);
    localStorage.removeItem('bookings');
  }

  getTotal(): number {
    return this.bookingsSubject.value.reduce((total, booking) => total + booking.totalPrice, 0);
  }

  private saveToLocalStorage(bookings: RoomBooking[]): void {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }
}