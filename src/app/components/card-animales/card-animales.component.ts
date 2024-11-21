import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-animales',
  standalone: true,
  imports: [],
  templateUrl: './card-animales.component.html',
  styleUrl: './card-animales.component.scss'
})
export class CardAnimalesComponent {
  //aqui no le muevas pa
  @Input() name : string = "";
  @Input() imgSrc : string = "";
  @Input() namaPet : string = "";
  @Input() refugio : string = "";
  @Input() edad : string = "";
  @Input() raza : string = "";

  constructor(private router: Router) {}

  enviarAdopcio(event: Event) {
    event.preventDefault();
    this.router.navigate(['/form-adoption']);
  }
}
