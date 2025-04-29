import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="logo-container">
          <svg class="logo" viewBox="0 0 24 24">
            <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
          </svg>
          <h1>Bienvenue</h1>
        </div>
        
        <form (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              [(ngModel)]="credentials.email" 
              required
              placeholder="exemple@email.com"
            >
            <svg class="input-icon" viewBox="0 0 24 24">
              <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z" />
            </svg>
          </div>
          
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              [(ngModel)]="credentials.password" 
              required
              placeholder="••••••••"
            >
            <svg class="input-icon" viewBox="0 0 24 24">
              <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A6,6 0 0,1 24,14V16H18V14H22A4,4 0 0,0 18,10V8M6,8V10A4,4 0 0,0 2,14H6V16H0V14A6,6 0 0,1 6,8Z" />
            </svg>
          </div>
          
          <button type="submit" class="login-button">
            <span>Se connecter</span>
            <svg class="arrow" viewBox="0 0 24 24">
              <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
            </svg>
          </button>
          
          <div *ngIf="errorMessage" class="error-message">
            <svg viewBox="0 0 24 24">
              <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
            {{ errorMessage }}
          </div>
        </form>
        
        <div class="login-footer">
          <p>Pas encore de compte ? <a [routerLink]="['/register']">Créer un compte</a></p>
          <a [routerLink]="['/forgot-password']" class="forgot-password">Mot de passe oublié ?</a>
        </div>
      </div>
      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
    </div>
  `,
  styles: [`
    /* Variables de couleur */
    :root {
      --primary-color: #4361ee;
      --primary-light: #4895ef;
      --secondary-color: #3f37c9;
      --error-color: #f72585;
      --text-color: #2b2d42;
      --text-light: #8d99ae;
      --background: #f8f9fa;
      --white: #ffffff;
    }

    /* Reset et styles de base */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, var(--background) 0%, #e9ecef 100%);
      padding: 20px;
      position: relative;
      overflow: hidden;
    }

    /* Cercles de décoration */
    .decoration-circle {
      position: absolute;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(67, 97, 238, 0.1) 0%, rgba(72, 149, 239, 0.2) 100%);
      z-index: 0;
    }

    .circle-1 {
      width: 300px;
      height: 300px;
      top: -100px;
      left: -100px;
    }

    .circle-2 {
      width: 200px;
      height: 200px;
      bottom: -50px;
      right: -50px;
    }

    /* Carte de login */
    .login-card {
      background: var(--white);
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      padding: 2.5rem;
      width: 100%;
      max-width: 420px;
      position: relative;
      z-index: 1;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .login-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
    }

    /* Logo et titre */
    .logo-container {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo {
      width: 60px;
      height: 60px;
      fill: var(--primary-color);
      margin-bottom: 1rem;
    }

    h1 {
      color: var(--text-color);
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    /* Formulaire */
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      position: relative;
    }

    label {
      font-weight: 500;
      color: var(--text-color);
      font-size: 0.9rem;
    }

    input {
      padding: 0.9rem 1rem 0.9rem 2.5rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      background-color: #fafafa;
      color: var(--text-color);
    }

    input:focus {
      outline: none;
      border-color: var(--primary-light);
      box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
      background-color: var(--white);
    }

    .input-icon {
      position: absolute;
      left: 12px;
      top: 38px;
      width: 20px;
      height: 20px;
      fill: var(--text-light);
      transition: fill 0.3s ease;
    }

    input:focus + .input-icon {
      fill: var(--primary-color);
    }

    /* Bouton de connexion */
    .login-button {
      padding: 1rem;
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
      color: var(--white);
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 0.5rem;
    }

    .login-button:hover {
      background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary-color) 100%);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
    }

    .login-button:active {
      transform: translateY(0);
    }

    .arrow {
      width: 20px;
      height: 20px;
      fill: var(--white);
      transition: transform 0.3s ease;
    }

    .login-button:hover .arrow {
      transform: translateX(3px);
    }

    /* Message d'erreur */
    .error-message {
      color: var(--error-color);
      text-align: center;
      margin-top: 1rem;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 0.8rem;
      background-color: rgba(247, 37, 133, 0.1);
      border-radius: 8px;
      animation: fadeIn 0.3s ease;
    }

    .error-message svg {
      width: 18px;
      height: 18px;
      fill: var(--error-color);
    }

    /* Pied de page */
    .login-footer {
      margin-top: 1.5rem;
      text-align: center;
      font-size: 0.9rem;
      color: var(--text-light);
    }

    .login-footer a {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .login-footer a:hover {
      color: var(--secondary-color);
      text-decoration: underline;
    }

    .forgot-password {
      display: block;
      margin-top: 0.8rem;
      font-size: 0.85rem;
    }

    /* Animation */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Responsive */
    @media (max-width: 480px) {
      .login-card {
        padding: 1.8rem;
      }
      
      h1 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  errorMessage = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    // Simulation de connexion réussie
    console.log('Tentative de connexion avec:', this.credentials);
    this.router.navigate(['/']);
  }
}