import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-denuncias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-denuncias.component.html',
  styleUrl: './card-denuncias.component.scss'
})
export class CardDenunciasComponent {
  @Input() nombre!: string;
  @Input() email!: string;
  @Input() ubicacion!: string;
  @Input() descripcion!: string;
  @Input() imagenUrl!: string;
}
