addToCart() {
  if (this.room && this.isValidBooking()) {
    const booking: RoomBooking = {
      roomId: this.room.id,
      roomType: this.room.type,
      roomName: this.room.name,
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