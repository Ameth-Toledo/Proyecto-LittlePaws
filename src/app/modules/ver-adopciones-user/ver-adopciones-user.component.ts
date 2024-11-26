import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CardAdopcionesUserComponent } from "../../components/card-adopciones-user/card-adopciones-user.component";
import { AdopcionService } from '../../services/adopcion/adopcion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-adopciones-user',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardAdopcionesUserComponent, CommonModule],
  templateUrl: './ver-adopciones-user.component.html',
  styleUrl: './ver-adopciones-user.component.scss'
})
export class VerAdopcionesUserComponent {
  adopciones: any[] = [];

  constructor(private adopcionService: AdopcionService) {}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('user_id')); // Obtener ID del usuario del localStorage
    if (userId) {
      this.adopcionService.getAllAdopciones(undefined, userId).subscribe({
        next: (response) => {
          this.adopciones = response;
          console.log('Adopciones cargadas:', this.adopciones);
        },
        error: (err) => {
          console.error('Error al cargar adopciones:', err);
        }
      });
    } else {
      console.error('ID de usuario no encontrado.');
    }
  }
}
