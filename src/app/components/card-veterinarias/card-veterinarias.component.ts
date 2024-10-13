import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-veterinarias',
  standalone: true,
  imports: [],
  templateUrl: './card-veterinarias.component.html',
  styleUrl: './card-veterinarias.component.scss'
})
export class CardVeterinariasComponent {
  @Input() nameVeterinaria : string = '';
  @Input() ImgSrc : string = '';
  @Input() Horario : string = '';
  @Input() ruta : string = '/';

  constructor(private router: Router) {}

  enviarVeterinarias(event: Event) {
    event.preventDefault();
    this.router.navigate([this.ruta]);
  }
}
