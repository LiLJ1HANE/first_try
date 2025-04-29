export interface Room {
    id: number;
    hotel_id: number;
    room_number: string;
    type: string;
    price_per_night: number;  // Note this is price_per_night, not just price
    is_available: boolean;
    capacity: number;
  }
  
  export interface ReservationRequest {
    room_id: number;
    check_in: string;
    check_out: string;
    guest_name: string;
  }
  
  export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
    status?: number;
  }