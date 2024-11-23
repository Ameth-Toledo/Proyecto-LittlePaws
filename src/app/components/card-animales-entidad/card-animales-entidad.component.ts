import { Component, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascotasService } from '../../services/mascotas/mascotas.service';

@Component({
  selector: 'app-card-animales-entidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-animales-entidad.component.html',
  styleUrl: './card-animales-entidad.component.scss'
})
export class CardAnimalesEntidadComponent {
  @Input() name : string = "";
  @Input() imgSrc : string = "";
  @Input() namePet: string = "";
  @Input() refugio : string = "";
  @Input() edad : string = "";
  @Input() raza : string = "";
  @Input() idMascota!: number;
  @Input() entityId!: number;
  @Output() petDeleted: EventEmitter<number> = new EventEmitter<number>();

  showIds: boolean = false;

  showModal : boolean = false;
  showWarningModal : boolean = false;
  showSuccessModal : boolean = false

  constructor (private mascotasService: MascotasService){}


  

  toggleModal() {
    if (!this.showModal) {
      this.showModal = true;
    } else {
      this.showWarningModal = true;
    }
  }

  closeWarningModal(confirmClose: boolean) {
    if (confirmClose) {
      this.showModal = false;
    }
    this.showWarningModal = false;
  }

  closeWarningModalDelete(confirmClose: boolean) {
    if (confirmClose) {
      this.showModal = false;
      this.deletePets();
    }
    this.showWarningModal = false;
  }

  onSubmit() {
    if (this.formIsValid()) {
      this.showSuccessModal = true;
    } else {
    }
  }


  deletePets() {
    if (!this.idMascota) {
      console.error('ID de la mascota no proporcionado');
      return;
    }

    this.mascotasService.deleteMascota(this.idMascota).subscribe({
      next: (response) => {
        console.log('Mascota eliminada correctamente:', response);
        this.petDeleted.emit(this.idMascota);
      },
      error: (err) => {
        console.error('Error al eliminar la mascota:', err);
      }
    });
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  formIsValid() : boolean {
    return true;
  }
}
