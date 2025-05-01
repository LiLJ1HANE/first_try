import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importer CommonModule
import { FormsModule } from '@angular/forms'; // Importer FormsModule
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ajouter CommonModule et FormsModule ici
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

        <!-- Afficher le message d'erreur -->
        <div *ngIf="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" class="btn btn-primary">Se connecter</button>
      </form>
    </div>
  `,
  styleUrls: ['./login.component.css']
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

    // Appel au backend pour la connexion
    this.http.post(`${environment.apiUrl}/login`, this.credentials).subscribe({
      next: (response: any) => {
        console.log('Connexion réussie :', response);
        localStorage.setItem('auth_token', response.token); // Stocker le token
        this.router.navigate(['/']); // Rediriger vers la page d'accueil ou tableau de bord
      },
      error: (error) => {
        console.error('Erreur lors de la connexion :', error);
        if (error.status === 401) {
          this.errorMessage = 'Email ou mot de passe incorrect';
        } else {
          this.errorMessage = 'Email ou mot de passe incorrecte .';
        }
      }
    });
  }
}