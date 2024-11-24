import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-user',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './perfil-user.component.html',
  styleUrl: './perfil-user.component.scss'
})
export class PerfilUserComponent {
  @Input() nameUser : string = '';
  @Input() emailUser : string = '';

  constructor (private router : Router) {}

  enviarDenunciasForm(event : Event) {
    event.preventDefault();
    this.router.navigate(['/denuncias-form']);
  }

  abrirModal() {
    const modal = document.getElementById('modal-add-mascotas');
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  cerrarModal() {
    const modal = document.getElementById('modal-add-mascotas');

    if (modal) {
      modal.style.display = 'none'
    }
  }
}
