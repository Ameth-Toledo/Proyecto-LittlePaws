import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  @Input() namaPet : string = "";
  @Input() refugio : string = "";
  @Input() edad : string = "";
  @Input() raza : string = "";

  showModal : boolean = false;
  showWarningModal : boolean = false;
  showSuccessModal : boolean = false

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

  onSubmit() {
    if (this.formIsValid()) {
      this.showSuccessModal = true;
    } else {
      // aqui pa cuando de error, pero sera otra modal
    }
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  formIsValid() : boolean {
    return true;
  }
}
