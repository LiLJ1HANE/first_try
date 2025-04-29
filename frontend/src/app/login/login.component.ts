import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.loginForm.valid) {
      // Implémenter la logique d'authentification ici
      console.log('Login tentative:', this.loginForm.value);
      
      // Simulation de connexion réussie
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/accueil']);
    }
  }
}
