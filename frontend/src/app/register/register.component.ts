import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="register-container">
      <h2>Créer un compte</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">Nom</label>
          <input
            type="text"
            id="name"
            [(ngModel)]="user.name"
            name="name"
            class="form-control"
            placeholder="Entrez votre nom"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            [(ngModel)]="user.email"
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
            [(ngModel)]="user.password"
            name="password"
            class="form-control"
            placeholder="Entrez votre mot de passe"
            required
          />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirmez le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            [(ngModel)]="user.password_confirmation"
            name="confirmPassword"
            class="form-control"
            placeholder="Confirmez votre mot de passe"
            required
          />
        </div>

        <div *ngIf="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" class="btn btn-primary">S'inscrire</button>
      </form>
    </div>
  `,
  styles: [`
    .register-container {
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      background-color: #f9f9f9;
    }

    h2 {
      text-align: center;
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    }

    button {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }

    button:hover {
      background-color: #0056b3;
    }

    .error-message {
      color: red;
      font-size: 14px;
      margin-bottom: 10px;
      text-align: center;
    }
  `]
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (!this.user.name || !this.user.email || !this.user.password || !this.user.password_confirmation) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    if (this.user.password !== this.user.password_confirmation) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return;
    }

    // Appel au backend
    this.http.post('http://127.0.0.1:8000/api/register', this.user).subscribe({
      next: (response: any) => {
        console.log('Inscription réussie :', response);
        this.errorMessage = 'Inscription réussie !'; // Message temporaire
        this.router.navigate(['/login']); // Rediriger vers la page de connexion après l'inscription
      },
      error: (error) => {
        console.error('Erreur lors de l\'inscription :', error);
        this.errorMessage = error.error.message || 'Une erreur est survenue lors de l\'inscription.';
      }
    });
  }
}