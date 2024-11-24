import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-user',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.scss']
})
export class PerfilUserComponent {
  @Input() nameUser: string = '';
  @Input() emailUser: string = '';

  isDenunciaModalOpen = false;
  isMascotasModalOpen = false;
  isAdopcionesModalOpen = false;
  isEditProfileModalOpen = false;
  isMessagesModalOpen = false;

  constructor (private router : Router) {}

  openDenunciaModal() {
    this.isDenunciaModalOpen = true;
  }

  closeDenunciaModal() {
    this.isDenunciaModalOpen = false;
  }

  openMascotasModal() {
    this.isMascotasModalOpen = true;
  }

  closeMascotasModal() {
    this.isMascotasModalOpen = false;
  }

  openAdopcionesModal() {
    this.isAdopcionesModalOpen = true;
  }

  closeAdopcionesModal() {
    this.isAdopcionesModalOpen = false;
  }

  openEditProfileModal() {
    this.isEditProfileModalOpen = true;
  }

  closeEditProfileModal() {
    this.isEditProfileModalOpen = false;
  }

  openMessagesModal() {
    this.isMessagesModalOpen = true;
  }

  closeMessagesModal() {
    this.isMessagesModalOpen = false;
  }

  cerrarModal() {

  }

  enviarDenunciasForm(event : Event) {
    event.preventDefault();
    this.router.navigate(['/denuncias-form']);
  }

  abrirModal(modalType : string) {
    switch (modalType) {
      case 'denuncia' :
        this.isDenunciaModalOpen = true;
        break;
      case 'mascotas' :
        this.isMascotasModalOpen = true;
        break;
      case 'adopciones' :
        this.isAdopcionesModalOpen = true;
        break;
      case 'editProfile' :
        this.isEditProfileModalOpen = true;
        break;
      case 'messages' :
        this.isMessagesModalOpen = true;
        break; 
    }
  }
}
