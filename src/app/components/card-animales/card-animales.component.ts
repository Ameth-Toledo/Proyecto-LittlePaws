import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-animales',
  standalone: true,
  imports: [CommonModule  ],
  templateUrl: './card-animales.component.html',
  styleUrl: './card-animales.component.scss'
})
export class CardAnimalesComponent {
  @Input() name: string = '';
  @Input() imgSrc: string = '';
  @Input() namaPet: string = '';
  @Input() refugio: string = '';
  @Input() edad: string = '';
  @Input() raza: string = '';
  @Input() idMascota!: number;
  @Input() entityId!: number;

  showIds: boolean = false;

  constructor(private router: Router) {}

  navigateToForm(idMascota: number, idEntidad: number): void {
    this.router.navigate(['/form-adoption'], {
      queryParams: {
        id_mascota: idMascota,
        id_entidad: idEntidad,
      },
    });
  }
}
