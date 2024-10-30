import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderEntidadComponent } from "../../components/header-entidad/header-entidad.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entidad',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderEntidadComponent],
  templateUrl: './entidad.component.html',
  styleUrl: './entidad.component.scss'
})
export class EntidadComponent {
  isSidebarOpen = false;
  isModalOpen = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  openModal(section: string) {
    if (section === 'Bandeja') {
      this.isModalOpen = true;
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }
  
  enviarDenuncias(event: Event) {
    event.preventDefault();
    this.router.navigate(['/denuncias']);
    this.isSidebarOpen = false;
  }
}
