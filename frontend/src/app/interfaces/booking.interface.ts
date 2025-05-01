export interface Booking {
  id?: number;
  roomId: number;
  roomName: string;
  roomType: 'Standard' | 'Deluxe' | 'Suite Familiale';
  checkIn: Date;
  checkOut: Date;
  nights: number;
  price: number;
  totalPrice: number;
  tax?: number;
  finalPrice?: number;
  status?: 'confirmed' | 'pending' | 'cancelled' | 'no-show';
  guestCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: number;
}

export interface BookingCreateDto {
  roomId: number;
  checkIn: string;
  checkOut: string;
  guestCount: number;
  specialRequests?: string;
}

export interface BookingUpdateDto {
  checkIn?: string;
  checkOut?: string;
  guestCount?: number;
  specialRequests?: string;
  status?: 'confirmed' | 'cancelled';
}