export interface Room {
  id: number;
  type: 'Standard' | 'Deluxe' | 'Suite Familiale';
  name: string;
  description: string;
  price: number;
  capacity: number;
  amenities: string[];
  imageUrl: string;
  available: boolean;
}

export interface RoomBooking {
  roomId: number;
  roomType: string;
  roomName: string;
  checkIn: Date;
  checkOut: Date;
  numberOfNights: number;
  basePrice: number;
  taxRate: number;
  totalPrice: number;
  guestCount: number;
} 