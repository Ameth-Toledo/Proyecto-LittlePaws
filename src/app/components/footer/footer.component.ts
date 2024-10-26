import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  isModalOpen = false;
  isAlertVisible = false;

  openModal(){
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  copyLink() {
    const link = 'https://ameth-toledo.github.io/prueba/';
    navigator.clipboard.writeText(link).then(() => {
      this.showAlert();
    });
  }

  showAlert() {
    this.isAlertVisible = true;
    setTimeout(() => {
      this.isAlertVisible = false;
    }, 3000);
  }
}
