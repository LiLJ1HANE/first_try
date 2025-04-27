import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Room } from '../interfaces/room.interface';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'il n'y a pas de requêtes HTTP en suspens
  });

  it('devrait être créé', () => {
    expect(service).toBeTruthy();
  });

  it('devrait récupérer les chambres via GET', () => {
    const mockRooms: Room[] = [
      { id: 1, hotel_id: 1, room_number: '101', type: 'Standard', price_per_night: 100, is_available: true, capacity: 2 }
    ];

    service.getRooms().subscribe(rooms => {
    //  expect(rooms).toEqual(mockRooms);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/rooms');
    expect(req.request.method).toBe('GET');
    req.flush(mockRooms);
  });

  it('devrait effectuer une réservation via POST', () => {
    const mockReservation = {
      room_id: 1,
      check_in: '2023-12-01',
      check_out: '2023-12-05',
      guest_name: 'Test Guest'
    };

    const mockResponse = { success: true, message: 'Réservation confirmée' };

    service.reserveRoom(mockReservation).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/rooms/reserve');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockReservation);
    req.flush(mockResponse);
  });

  it('devrait gérer les erreurs HTTP', () => {
    const mockError = { status: 404, statusText: 'Not Found' };
    
    service.getRooms().subscribe({
      next: () => fail('devrait avoir échoué'),
      error: (error) => {
        expect(error.status).toEqual(404);
      }
    });

    const req = httpMock.expectOne('http://localhost:8000/api/rooms');
    req.flush('Erreur', mockError);
  });
});