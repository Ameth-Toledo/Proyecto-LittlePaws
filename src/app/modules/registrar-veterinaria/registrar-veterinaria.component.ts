import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-veterinaria',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './registrar-veterinaria.component.html',
  styleUrl: './registrar-veterinaria.component.scss'
})
export class RegistrarVeterinariaComponent {
  constructor(private router: Router) {}

  enviarHome(event: Event) {
    event.preventDefault();
    this.router.navigate(['/home']);
  }

  refugioData: any = {
    name: '',
    phone: '',
    email: '',
    address: '',
    hours: '',
    location: '',
    facebook: '',
    instagram: '',
    twitter: '',
    fotoPerfil: ''
  };


  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      this.refugioData.fotoPerfil = input.files[0];
    }
  }

  enviarRefugio(): void {
    const perfilEnlace = `perfil-refugio/${this.refugioData.name.replace(/\s+/g, '-').toLowerCase()}`;
    this.router.navigate([perfilEnlace], { state: this.refugioData });
  }
}
