import { Component, OnInit } from '@angular/core';
import { AvailabilityService } from '../services/availability.service';
import { AvailabilityReportItem, RoomType } from '../interfaces/room.interface';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-availability-report',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './availability-report.component.html',
  styleUrls: ['./availability-report.component.css'],
  providers: [AvailabilityService]
})
export class AvailabilityReportComponent implements OnInit {
  reportData: AvailabilityReportItem[] = [];
  filteredData: AvailabilityReportItem[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;
  
  // Date filters
  startDate: string;
  endDate: string;
  selectedRoomType: RoomType | 'all' = 'all';

  constructor(private availabilityService: AvailabilityService) {
    const today = new Date();
    this.startDate = this.formatDate(today);
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    this.endDate = this.formatDate(nextWeek);
  }

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.availabilityService.getDateRangeAvailability(
      new Date(this.startDate),
      new Date(this.endDate)
    ).subscribe({
      next: (data: AvailabilityReportItem[]) => {
        this.reportData = data;
        this.filterData();
        this.isLoading = false;
      },
      error: (err: Error) => {
        this.errorMessage = 'Failed to load availability report';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  filterData(): void {
    this.filteredData = this.reportData.filter(item => 
      this.selectedRoomType === 'all' || item.roomType === this.selectedRoomType
    );
  }

  onFilterChange(): void {
    this.filterData();
  }

  onDateChange(): void {
    this.loadReport();
  }

  exportToCSV(): void {
    let csv = 'Date,Type,Total,Booked,Available,Occupancy%\n';
    
    this.filteredData.forEach(item => {
      csv += `"${new Date(item.date).toLocaleDateString()}","${item.roomType}",${item.totalRooms},${item.bookedRooms},${item.availableRooms},${item.percentageBooked}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `availability-report_${this.startDate}_${this.endDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}