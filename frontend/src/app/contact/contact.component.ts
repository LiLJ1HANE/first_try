import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.contactForm.valid) {
      // Envoyer le formulaire au backend
      console.log('Formulaire soumis:', this.contactForm.value);
      alert('Message envoyé avec succès!');
      this.contactForm.reset();
      this.submitted = false;
    }
  }
}