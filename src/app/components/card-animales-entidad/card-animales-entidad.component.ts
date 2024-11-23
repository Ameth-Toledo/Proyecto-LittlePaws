import { Component, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascotasService } from '../../services/mascotas/mascotas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-animales-entidad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-animales-entidad.component.html',
  styleUrls: ['./card-animales-entidad.component.scss']
})
export class CardAnimalesEntidadComponent implements OnChanges {
  @Input() name: string = '';
  @Input() imgSrc: string = '';
  @Input() namePet: string = '';
  @Input() refugio: string = '';
  @Input() edad!: number;
  @Input() raza: string = '';
  @Input() idMascota!: number;
  @Input() entityId!: number;
  @Input() weight!: number;
  @Output() petDeleted: EventEmitter<number> = new EventEmitter<number>();
  @Output() petUpdated: EventEmitter<any> = new EventEmitter<any>();

  showIds: boolean = false;
  showModal: boolean = false;
  showWarningModal: boolean = false;
  showSuccessModal: boolean = false;
  showWarningModalDelete: boolean = false; 

  formChanged: boolean = false;

  petData = {
    name: '',
    race: '',
    age: 0,
    gender: 'macho',
    species: 'perro',
    weight: 0,
    size: 'mediano',
    entity_id: 0, 
    file: null as File | null 
  };

  constructor(private mascotasService: MascotasService) {}

  toggleModal() {
    if (this.showModal) {
      if (this.formChanged || !this.formIsValid()) {
        this.showWarningModal = true;
      } else {
        this.showModal = false;
      }
    } else {
      this.showModal = true;
      this.formChanged = false;
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
      this.deletePets();
    }
    this.showWarningModalDelete = false;
  }

  onSubmit() {
    if (this.formIsValid()) {
      if (this.idMascota) {
        this.updatePet();
      } else {
        console.error('ID de la mascota no proporcionado');
      }
      this.showSuccessModal = true;
      this.formChanged = false;
    } else {
      console.error('Formulario no válido');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.petData.file = file;
    }
  }

  triggerFileInput() {
    document.getElementById('file')?.click();   
  }

  updatePet() {
    if (!this.idMascota) {
      console.error('ID de la mascota no proporcionado');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', this.petData.name);
    formData.append('race', this.petData.race);
    formData.append('age', this.petData.age.toString());
    formData.append('gender', this.petData.gender);
    formData.append('species', this.petData.species);
    formData.append('weight', this.petData.weight.toString());
    formData.append('size', this.petData.size);
    formData.append('entity_id', this.petData.entity_id.toString());
  
    if (this.petData.file) {
      formData.append('file', this.petData.file);
    }
  
    this.mascotasService.updateMascota(this.idMascota, formData).subscribe({
      next: (response) => {
        console.log('Mascota actualizada correctamente:', response);
  
        // Agrega un parámetro único a la URL de la imagen
        const updatedImageSrc = `${response.imgSrc}?t=${new Date().getTime()}`;
  
        const updatedPet = {
          idMascota: this.idMascota,
          name: this.petData.name,
          race: this.petData.race,
          age: this.petData.age,
          size: this.petData.size,
          gender: this.petData.gender,
          imgSrc: updatedImageSrc, // Usa la URL actualizada
        };
  
        this.petUpdated.emit(updatedPet);
        this.closeModal();
      },
      error: (err) => {
        console.error('Error al actualizar la mascota:', err);
      },
    });
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

  closeModal() {
    this.showModal = false;
    this.showWarningModal = false;
  }

  formIsValid(): boolean {
    return !!this.petData.name && !!this.petData.race && !!this.petData.age && !!this.petData.gender && !!this.petData.species && !!this.petData.weight && !!this.petData.size && !!this.petData.entity_id;
  }

  ngOnChanges() {
    console.log('edad:', this.edad, 'peso:', this.weight);
    if (this.idMascota) {
      this.petData = {
        name: this.namePet,
        race: this.raza,
        age: typeof this.edad === 'number' ? this.edad : 0, 
        gender: 'macho',
        species: 'perro',
        weight: this.weight !== undefined ? this.weight : 0, 
        size: 'mediano',
        entity_id: this.entityId, 
        file: null 
      };
      this.formChanged = false;
    }
  }

  detectChanges() {
    this.formChanged = true;
  }
}
