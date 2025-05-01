// room.interface.ts
export type RoomType = 'Standard' | 'Deluxe' | 'Suite Familiale';

export interface Room {
  id: number;
  type: RoomType;
  name: string;
  description: string;
  price: number;
  capacity: number;
  amenities: string[];
  imageUrl: string;
  available: boolean;
  quantity?: number; // Total rooms of this type available
}

export interface RoomBooking {
  roomId: number;
  roomName: string;
  roomType: RoomType;
  checkIn: Date;
  checkOut: Date;
  numberOfNights: number;
  basePrice: number;
  taxRate: number;
  totalPrice: number;
  guestCount: number;
}

export interface RoomAvailability {
  isAvailable: boolean;
  availableRooms: number;
}

export interface AvailabilityReportItem {
  date: Date;
  roomType: RoomType;
  totalRooms: number;
  bookedRooms: number;
  availableRooms: number;
  percentageBooked: number;
}

