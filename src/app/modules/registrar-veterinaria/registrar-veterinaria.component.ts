import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-veterinaria',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './registrar-veterinaria.component.html',
  styleUrl: './registrar-veterinaria.component.scss'
})
export class RegistrarVeterinariaComponent {
  constructor(private router: Router) {}

  enviarHome(event: Event) {
    event.preventDefault();
    this.router.navigate(['/home']);
  }
}
