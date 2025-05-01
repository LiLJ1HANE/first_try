import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <h2>Connexion</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            [(ngModel)]="credentials.email"
            name="email"
            class="form-control"
            placeholder="Entrez votre email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            [(ngModel)]="credentials.password"
            name="password"
            class="form-control"
            placeholder="Entrez votre mot de passe"
            required
          />
        </div>

        <div *ngIf="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" class="btn btn-primary">Se connecter</button>
      </form>

      <div class="register-link">
        <p>Pas encore de compte ?</p>
        <button class="btn btn-secondary" (click)="navigateToRegister()">Créer un compte</button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('assets/images/hotel.jpg');
      background-size: cover;
      background-position: center;
      padding: 20px;
    }

    .login-container {
      max-width: 500px;
      margin: 50px auto;
      padding: 40px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
    }

    .login-container h2 {
      text-align: center;
      color: rgb(76, 161, 103);
      margin-bottom: 30px;
      font-size: 2rem;
    }

    .form-group {
      margin-bottom: 25px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      color: #555;
      font-weight: 500;
    }

    .form-control {
      width: 100%;
      padding: 12px 15px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }

    .form-control:focus {
      outline: none;
      border-color: rgb(76, 161, 103);
    }

    .error-message {
      color: #e74c3c;
      margin: 15px 0;
      text-align: center;
      font-size: 0.9rem;
    }

    .btn {
      display: block;
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-primary {
      background-color: rgb(76, 161, 103);
      color: white;
    }

    .btn-primary:hover {
      background-color: #3a8d5e;
    }

    .btn-secondary {
      background-color: transparent;
      color: rgb(76, 161, 103);
      border: 2px solid rgb(76, 161, 103);
      margin-top: 10px;
    }

    .btn-secondary:hover {
      background-color: rgba(76, 161, 103, 0.1);
    }

    .register-link {
      text-align: center;
      margin-top: 25px;
      color: #666;
    }

    .register-link p {
      margin-bottom: 10px;
    }
  `]
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    this.http.post(`${environment.apiUrl}/login`, this.credentials).subscribe({
      next: (response: any) => {
        localStorage.setItem('auth_token', response.token);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = error.status === 401 
          ? 'Email ou mot de passe incorrect' 
          : 'Une erreur est survenue. Veuillez réessayer.';
      }
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}