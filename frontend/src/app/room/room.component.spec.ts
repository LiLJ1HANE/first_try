import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  loading: boolean = true; // Start with loading true
  rooms: any[] = []; // Initialize empty array

  ngOnInit() {
    // Simulate data loading (replace with actual API call)
    setTimeout(() => {
      this.rooms = [
        {
          id: 1,
          room_number: '101',
          type: 'Deluxe',
          price: 200,
          name: 'Bonheur Room',
          capacity: 2
        },
        {
          id: 2,
          room_number: '102',
          type: 'Suite',
          price: 300,
          name: 'Luxury Suite',
          capacity: 4
        }
      ];
      this.loading = false; // Set loading to false when data is loaded
    }, 1000); // 1 second delay to simulate API call
  }
}