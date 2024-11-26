import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-card-donaciones-entidad',
  standalone: true,
  imports: [],
  templateUrl: './card-donaciones-entidad.component.html',
  styleUrl: './card-donaciones-entidad.component.scss'
})
export class CardDonacionesEntidadComponent {
  @Input() cantidad : string = "";
  @Input() fecha : string = "";
}
