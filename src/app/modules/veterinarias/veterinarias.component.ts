import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CardVeterinariasComponent } from "../../components/card-veterinarias/card-veterinarias.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-veterinarias',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardVeterinariasComponent],
  templateUrl: './veterinarias.component.html',
  styleUrl: './veterinarias.component.scss'
})
export class VeterinariasComponent {
  constructor(private router: Router) {}

  enviarVeterinarias(event: Event) {
    event.preventDefault();
    this.router.navigate(['/perfil-veterinaria-zoo']);
  }
}
