import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private router : Router) {}

  enviarLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(['/login']);
  }

  togglePassword(inputId: string) {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    inputElement.type = inputElement.type === 'password' ? 'text' : 'password';
  }

  validarFormulario(event: Event) {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    if (!email || !password) {
      this.mostrarModal();
    } else {
      // Aquí puedes manejar el inicio de sesión
      console.log('Formulario enviado');
    }
  }

  mostrarModal() {
    const modal = document.getElementById('errorModal')!;
    modal.style.display = 'flex'; // Muestra el modal
  }

  closeModal() {
    const modal = document.getElementById('errorModal')!;
    modal.style.display = 'none'; // Cierra el modal
  }
}
