export interface Booking {
    id?: number;
    roomId: number;
    roomName: string;
    checkIn: Date;
    checkOut: Date;
    nights: number;
    price: number;
    totalPrice: number;
    tax?: number;
    finalPrice?: number;
  }