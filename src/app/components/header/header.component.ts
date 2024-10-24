import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isOpen: boolean = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  enviarInicio(event: Event) {
    event.preventDefault();
    this.router.navigate(['/home']);
  }

  enviarLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(['/login']);
  }

  enviarAdopcion(event: Event) {
    event.preventDefault();
    this.router.navigate(['/adopciones']);
  }

  enviarDonaciones(event: Event) {
    event.preventDefault();
    this.router.navigate(['/donaciones']);
  }

  enviarDenuncias(event: Event) {
    event.preventDefault();
    this.router.navigate(['/denuncias']);
  }

  isRouteActive(route : string): boolean {
    return this.router.url === route;
  }
}
