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
  isUserLoggedIn : boolean = false;

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
    if (this.isUserLoggedIn) {
      this.logout(); 
    } else {
      this.router.navigate(['/login']); 
    }
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

  enviarExtraviadas(event : Event) {
    event.preventDefault();
    this.router.navigate(['/mascotas-extraviadas']);
  }

  isRouteActive(route : string): boolean {
    return this.router.url === route;
  }

  ngOnInit() {
    this.isUserLoggedIn = !!localStorage.getItem('session');
  }

  logout() {
    localStorage.removeItem('session');
    this.isUserLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
