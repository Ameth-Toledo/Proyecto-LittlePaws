import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntidadService } from '../../services/entidad/entidad.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CardVeterinariasComponent } from '../../components/card-veterinarias/card-veterinarias.component';
import { Entidad, EntidadResponse } from '../../models/entidad';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-veterinarias',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardVeterinariasComponent, CommonModule],
  templateUrl: './veterinarias.component.html',
  styleUrls: ['./veterinarias.component.scss'],
})
export class VeterinariasComponent implements OnInit {
  veterinarias: EntidadResponse[] = [];
  @Input() nameVeterinaria!: string;
  @Input() descripcionVeterinaria!: string;
  @Input() imgSrc!: string;
  @Input() telefonoVeterinaria!: string;
  @Input() emailVeterinaria!: string;
  @Input() direccionVeterinaria!: string;
  @Input() horarioVeterinaria!: string;

  constructor(private router: Router, private entidadService: EntidadService) {}

  ngOnInit(): void {
    this.loadVeterinarias();
  }

  loadVeterinarias(): void {
    this.entidadService.getVeterinarias().subscribe({
      next: (data: EntidadResponse[]) => {
        this.veterinarias = data;
        console.log('Veterinarias cargadas:', this.veterinarias);
      },
      error: (err) => {
        console.error('Error al cargar las veterinarias:', err);
      },
    });
  }

  goToRegistrarVeterinaria(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/registrar-veterinaria']);
  }
  
  enviarRegistrar(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/registrar-veterinaria']);
  }
}
