import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-adopciones-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-adopciones-user.component.html',
  styleUrl: './card-adopciones-user.component.scss'
})
export class CardAdopcionesUserComponent {
  @Input() namePet: string = '';
  @Input() nameRefugio: string = '';
  @Input() userAdopcion: string = '';
  @Input() status: string = '';
  @Input() idAdopcion?: number;
}
