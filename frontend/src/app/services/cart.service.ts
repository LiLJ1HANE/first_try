import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoomBooking } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly TAX_RATE = 0.20; // 20% tax rate
  private bookings = new BehaviorSubject<RoomBooking[]>([]);
  bookings$ = this.bookings.asObservable();

  constructor() {
    // Charger les réservations du localStorage au démarrage
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      const parsedBookings = JSON.parse(savedBookings);
      // Convertir les dates string en objets Date
      parsedBookings.forEach((booking: RoomBooking) => {
        booking.checkIn = new Date(booking.checkIn);
        booking.checkOut = new Date(booking.checkOut);
      });
      this.bookings.next(parsedBookings);
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('bookings', JSON.stringify(this.bookings.value));
  }

  addBooking(booking: RoomBooking) {
    const currentBookings = this.bookings.value;
    const existingIndex = currentBookings.findIndex(b => b.roomId === booking.roomId);
    
    if (existingIndex !== -1) {
      currentBookings[existingIndex] = booking;
    } else {
      currentBookings.push(booking);
    }
    
    this.bookings.next(currentBookings);
    this.saveToLocalStorage();
  }

  updateBooking(booking: RoomBooking) {
    const currentBookings = this.bookings.value;
    const index = currentBookings.findIndex(b => b.roomId === booking.roomId);
    
    if (index !== -1) {
      currentBookings[index] = booking;
      this.bookings.next(currentBookings);
      this.saveToLocalStorage();
    }
  }

  removeBooking(roomId: number) {
    const currentBookings = this.bookings.value.filter(b => b.roomId !== roomId);
    this.bookings.next(currentBookings);
    this.saveToLocalStorage();
  }

  getTotal(): number {
    return this.bookings.value.reduce((total, booking) => total + booking.totalPrice, 0);
  }

  clearCart() {
    this.bookings.next([]);
    localStorage.removeItem('bookings');
  }
}