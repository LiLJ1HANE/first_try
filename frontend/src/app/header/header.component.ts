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
        <a routerLink="/" class="logo">Le Grand Hôtel </a>
        
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
      background-color:rgb(83, 197, 189); /* Darker blue for a modern look */
      color: white;
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Slightly stronger shadow */
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
      font-size: 1.8rem; /* Slightly larger font for emphasis */
      font-weight: bold;
      color: white;
      text-decoration: none;
      transition: opacity 0.3s, transform 0.3s;
    }

    .logo:hover {
      opacity: 0.9;
      transform: scale(1.05); /* Subtle zoom effect */
    }

    .nav-links {
      display: flex;
      gap: 1.5rem; /* Adjusted spacing for better alignment */
      align-items: center;
    }

    .nav-links a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 1rem; /* Slightly larger font for readability */
      transition: background-color 0.3s, transform 0.3s;
    }

    .nav-links a:hover {
      background-color: rgba(255, 255, 255, 0.15); /* Softer hover effect */
      transform: translateY(-2px); /* Subtle lift effect */
    }

    .nav-links a.active {
      background-color: rgba(255, 255, 255, 0.25); /* Highlight active link */
      font-weight: bold;
    }

    .cart-link {
      position: relative;
    }

    .cart-badge {
      position: absolute;
      top: -10px;
      right: -10px;
      background-color: #f44336; /* Brighter red for better visibility */
      color: white;
      border-radius: 50%;
      padding: 0.3rem 0.6rem;
      font-size: 0.75rem;
      min-width: 1.5rem;
      text-align: center;
      font-weight: bold;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add depth */
    }

    .login-button {
      background-color: #4caf50; /* Green for positive action */
      color: white;
      padding: 0.5rem 1.2rem;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: bold;
      transition: background-color 0.3s, transform 0.3s;
    }

    .login-button:hover {
      background-color: #45a049;
      transform: translateY(-2px); /* Subtle lift effect */
    }

    @media (max-width: 768px) {
      .nav-links {
        gap: 1rem; /* Reduce spacing for smaller screens */
      }

      .nav-links a {
        padding: 0.5rem;
        font-size: 0.9rem; /* Slightly smaller font for mobile */
      }

      .logo {
        font-size: 1.5rem; /* Adjust logo size for mobile */
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