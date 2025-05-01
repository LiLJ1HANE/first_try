import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hero-section">
      <h1>Bienvenue sur notre plateforme de réservation de chambres d'hôtel</h1>
      <p>Trouvez la chambre d'hôtel parfaite pour votre prochain voyage</p>
      <button class="cta-button" (click)="navigateToRooms()">Voir nos chambres</button>
    </div>

    <div class="about-section">
      <div class="section-title-frame">
        <h2>Notre Histoire</h2>
      </div>
      <p>
        Fondé en 1925 par le visionnaire Gaston de Vigny, notre hôtel incarne l'art de vivre à la française. À l'origine demeure privée d'un collectionneur d'art, le bâtiment a été transformé en 1950 en palace avant-gardiste, accueillant têtes couronnées et icônes du cinéma. Sa rénovation en 2020 lui a valu le Prix du Patrimoine Luxe. En 1950, la petite-fille de Gaston, Marguerite de Vigny, métamorphosa la propriété 
    en l'un des premiers palaces français à recevoir l'électricité dans toutes ses chambres - 
    une innovation qui lui valut son nom actuel. Pendant les Années Folles, notre établissement 
    devint le refuge des icônes du cinéma muet et le lieu de tournage secret de plusieurs 
    chefs-d'œuvre du septième art.
      </p>
    </div>

    <div class="commitments-section">
      <div class="section-title-frame">
        <h2>Nos Engagements</h2>
      </div>
      <div class="commitments-grid">
        <div class="commitment-item">
          
          <h3>Service de majordome 24h/24</h3>
          <p>Un accompagnement personnalisé pour chaque moment de votre séjour</p>
        </div>
        <div class="commitment-item">
          
          <h3>Expériences sur mesure</h3>
          <p>Dîners en montgolfière, cours de sommellerie et activités exclusives</p>
        </div>
        <div class="commitment-item">
          
          <h3>Décor exceptionnel</h3>
          <p>Mélange unique d'art déco et de design contemporain</p>
        </div>
      </div>
      <div class="testimonial">
        <p>"Plus qu'un hôtel, un écrin où chaque détail raconte une histoire"</p>
        <span>– Le Figaro Magazine</span>
      </div>
    </div>

    <footer class="footer">
      <p>Suivez-nous sur les réseaux sociaux :</p>
      <div class="social-icons">
        <a href="https://twitter.com" target="_blank" aria-label="Twitter">
          <i class="bi bi-twitter"></i>
        </a>
        <a href="https://facebook.com" target="_blank" aria-label="Facebook">
          <i class="bi bi-facebook"></i>
        </a>
        <a href="https://instagram.com" target="_blank" aria-label="Instagram">
          <i class="bi bi-instagram"></i>
        </a>
      </div>
    </footer>
  `,
  styles: [`
    .hero-section {
      text-align: center;
      padding: 100px 20px;
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('assets/images/hotel.jpg');
      background-size: cover;
      background-position: center;
      color: white;
      min-height: 500px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
      .cta-frame {
    display: inline-block;
    padding: 3px; /* Contour fin */
    border: 2px solid white;
    border-radius: 50px;
    background: rgba(255,255,255,0.2);
    backdrop-filter: blur(5px);
    margin-top: 20px;
  }

  .cta-button {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    background-color: transparent;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .cta-button:hover {
    background-color: rgba(255,255,255,0.1);
    letter-spacing: 1.5px;
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
      background-color: rgb(83, 197, 189);
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .cta-button:hover {
      background-color: #0056b3;
    }

    .about-section, .commitments-section {
      text-align: center;
      padding: 50px 20px;
      background-color: #f9f9f9;
      color: #333;
    }

    .section-title-frame {
      display: inline-block;
      padding: 10px 30px;
      margin-bottom: 30px;
      border: 2px solid rgb(83, 197, 189);
      border-radius: 50px;
      position: relative;
    }

    .section-title-frame h2 {
      font-size: 2rem;
      margin: 0;
      color: rgb(83, 197, 189);
    }

    .about-section p {
      font-size: 1.1rem;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto 2rem;
    }

    .commitments-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      max-width: 1200px;
      margin: 0 auto 40px;
    }

    .commitment-item {
      padding: 25px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      transition: transform 0.3s;
    }

    .commitment-item:hover {
      transform: translateY(-5px);
    }

    .commitment-item .icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    .commitment-item h3 {
      color: rgb(83, 197, 189);
      margin-bottom: 10px;
    }

    .testimonial {
      font-style: italic;
      max-width: 600px;
      margin: 40px auto 0;
      padding: 20px;
      position: relative;
    }

    .testimonial p {
      font-size: 1.3rem;
      color: #555;
    }

    .testimonial span {
      display: block;
      text-align: right;
      font-style: normal;
      color: #777;
    }

    .footer {
      text-align: center;
      padding: 20px;
      background-color: rgb(83, 197, 189);
      color: white;
    }

    .footer p {
      margin-bottom: 10px;
      font-size: 1rem;
    }

    .social-icons {
      display: flex;
      justify-content: center;
      gap: 15px;
    }

    .social-icons a {
      color: white;
      font-size: 1.5rem;
      transition: transform 0.3s, color 0.3s;
    }

    .social-icons a:hover {
      transform: scale(1.2);
      color: #f9f9f9;
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToRooms() {
    this.router.navigate(['/rooms']);
  }
}