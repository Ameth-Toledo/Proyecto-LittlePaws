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
  selectedImage: string = ''; // Variable para almacenar la imagen seleccionada
  timer: any;

  // Método para abrir el modal y comenzar el temporizador
  openModal(imageUrl: string) {
    this.selectedImage = imageUrl; // Asignar la imagen seleccionada
    this.isModalOpen = true;
    this.imageViewed = false; // Resetear la visualización al abrir
    this.progress = 0; // Resetear el progreso
    this.startProgressBar();
  }

  // Método para cerrar el modal y limpiar el temporizador
  closeModal() {
    this.isModalOpen = false;
    clearInterval(this.timer); // Limpiar el intervalo
    this.imageViewed = true; // Marcar la imagen como vista
  }

  // Iniciar la barra de progreso y cerrar automáticamente después de 30 segundos
  startProgressBar() {
    const totalDuration = 30; // Duración en segundos
    const intervalDuration = 100; // Intervalo en milisegundos (0.1 segundos)
    let elapsedTime = 0;
    
    this.timer = setInterval(() => {
      elapsedTime += intervalDuration / 1000; // Incrementar el tiempo transcurrido
      this.progress = (elapsedTime / totalDuration) * 100; // Calcular el porcentaje de progreso
      
      if (elapsedTime >= totalDuration) {
        this.closeModal(); // Cerrar el modal después de 30 segundos
      }
    }, intervalDuration); // Intervalo de actualización de la barra de progreso
  }

  constructor(private router: Router) {}

  enviarVeterinarias(event: Event) {
    event.preventDefault();
    this.router.navigate(['/perfil-veterinaria']);
  }
}
