import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CardAnimalesComponent } from "../../components/card-animales/card-animales.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { IndicesAbandonoComponent } from "../../components/indices-abandono/indices-abandono.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CardAnimalesComponent, FooterComponent, IndicesAbandonoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isModalOpen = false;
  progress = 0;
  imageViewed = false;
  selectedImage: string = ''; 
  timer: any;

  openModal(imageUrl: string) {
    this.selectedImage = imageUrl; 
    this.isModalOpen = true;
    this.imageViewed = false; 
    this.progress = 0; 
    this.startProgressBar();
  }

  closeModal() {
    this.isModalOpen = false;
    clearInterval(this.timer); 
    this.imageViewed = true; 
  }

  startProgressBar() {
    const totalDuration = 10; 
    const intervalDuration = 100; 
    let elapsedTime = 0;
    
    this.timer = setInterval(() => {
      elapsedTime += intervalDuration / 1000;
      this.progress = (elapsedTime / totalDuration) * 100; 
      
      if (elapsedTime >= totalDuration) {
        this.closeModal(); 
      }
    }, intervalDuration); 
  }

  constructor(private router: Router) {}

  enviarVeterinarias(event: Event) {
    event.preventDefault();
    this.router.navigate(['/veterinarias']);
  }

  enviarLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(['/login']);
  }
}
