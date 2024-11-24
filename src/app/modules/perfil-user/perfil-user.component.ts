import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

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

  // Modal visibility flags
  isDenunciaModalOpen = false;
  isMascotasModalOpen = false;
  isAdopcionesModalOpen = false;
  isEditProfileModalOpen = false;
  isMessagesModalOpen = false;

  // Method to toggle modals
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
}
