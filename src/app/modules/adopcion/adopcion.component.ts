import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { BannerComponent } from "../../components/banner/banner.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-adopcion',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, BannerComponent],
  templateUrl: './adopcion.component.html',
  styleUrl: './adopcion.component.scss'
})
export class AdopcionComponent {
  constructor(private router: Router) {}
  
  enviarTerminos(event: Event) {
    event.preventDefault();
    this.router.navigate(['/terms-and-conditions']);
  }
}
