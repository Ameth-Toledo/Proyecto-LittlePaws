import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../services/register/register.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  passwordVisible: boolean = false;
  modalMessage : string = '';

  constructor(private router : Router,  private registerService: RegisterService) {
    const session = localStorage.getItem('session');
    if (session) {
      const sessionData = JSON.parse(session);

      if (sessionData.role === 'admin') {
        this.router.navigate(['/entidad-littlepaws']);
      } else {
        this.router.navigate(['/home'])
      }
    }
  }

  enviarRegister(event : Event) {
    event.preventDefault();
    this.router.navigate(['/register'])
  }

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = this.passwordVisible ? 'text' : 'password';
  }

  validarFormulario(event: Event) {
    event.preventDefault();
  
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
  
    if (!email || !password) {
      this.modalMessage = 'Debe llenar todos los campos.';
      this.mostrarModal();
      return; 
    }
  
    this.registerService.login({ email, password }).subscribe(
      (response) => { // Cambiar aquí para usar correctamente el parámetro `response`
        console.log('Usuario registrado en la base de datos');
        // Guardar datos de la respuesta en localStorage
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('user_id', String(response.id_user));
        localStorage.setItem('username', response.name);
        localStorage.setItem('lastname', response.lastName);
        localStorage.setItem('email', response.email);
  
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error en el registro:', error);
        this.modalMessage = 'Credenciales inválidas. Por favor, intente de nuevo.';
        this.mostrarModal();
      }
    );
  }
  
  mostrarModal() {
    const modal = document.getElementById('errorModal')!;
    modal.style.display = 'flex'; 
  }

  closeModal() {
    const modal = document.getElementById('errorModal')!;
    modal.style.display = 'none'; 
  }

  //metodo nuevo pa limpiar el local
  logout() {
    localStorage.removeItem('session');
    this.router.navigate(['/login'])
  }
}
