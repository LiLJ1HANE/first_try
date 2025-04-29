import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="header-content">
        <a routerLink="/" class="logo">Hôtel Luxe</a>
        
        <nav class="nav-links">
          <a 
            routerLink="/" 
            routerLinkActive="active" 
            [routerLinkActiveOptions]="{exact: true}"
          >Accueil</a>
          
          <a 
            routerLink="/rooms" 
            routerLinkActive="active"
          >Chambres</a>
          
          <a 
            routerLink="/cart" 
            routerLinkActive="active" 
            class="cart-link"
          >
            Panier
            <span class="cart-badge" *ngIf="cartItemCount > 0">
              {{ cartItemCount }}
            </span>
          </a>
          
          <a 
            routerLink="/contact" 
            routerLinkActive="active"
          >Contact</a>
          
          <a 
            routerLink="/login" 
            routerLinkActive="active"
            class="login-button"
          >Connexion</a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: #1a237e;
      color: white;
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
      text-decoration: none;
      transition: opacity 0.3s;
    }

    .logo:hover {
      opacity: 0.8;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    .nav-links a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    .nav-links a:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .nav-links a.active {
      background-color: rgba(255, 255, 255, 0.2);
    }

    .cart-link {
      position: relative;
    }

    .cart-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background-color: #dc3545;
      color: white;
      border-radius: 50%;
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      min-width: 1.5rem;
      text-align: center;
    }

    .login-button {
      background-color: #4caf50;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    .login-button:hover {
      background-color: #45a049;
    }

    @media (max-width: 768px) {
      .nav-links {
        gap: 1rem;
      }

      .nav-links a {
        padding: 0.5rem;
      }
    }
  `]
})
export class HeaderComponent {
  cartItemCount = 0;

  constructor(private cartService: CartService) {
    this.cartService.bookings$.subscribe(bookings => {
      this.cartItemCount = bookings.length;
    });
  }
}