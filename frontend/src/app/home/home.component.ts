import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hero-section">
      <h1>Bienvenue sur notre plateforme de réservation d'hôtel</h1>
      <p>Trouvez l'hôtel parfait pour votre prochain voyage</p>
      <button class="cta-button" (click)="navigateToRooms()">Voir nos chambres</button>
    </div>
  `,
  styles: [`
    .hero-section {
      text-align: center;
      padding: 100px 20px;
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/images/hotel-hero.jpg');
      background-size: cover;
      background-position: center;
      color: white;
      min-height: 500px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }

    .cta-button {
      padding: 1rem 2rem;
      font-size: 1.1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .cta-button:hover {
      background-color: #0056b3;
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToRooms() {
    this.router.navigate(['/rooms']);
  }
}