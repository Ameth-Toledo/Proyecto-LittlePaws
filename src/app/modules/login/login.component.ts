import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private router : Router) {
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
  
    if (email === '233363@ids.upchiapas.edu.mx' && password === '233363') {
      //pa probar la sesion con localstorage
      localStorage.setItem('session', JSON.stringify({ email: email, role: 'user' }));
      this.router.navigate(['/home']);
    } else if (email === '233362@ids.upchiapas.edu.mx' && password === '233362') {
      localStorage.setItem('session', JSON.stringify({ email: email, role: 'admin' }));
      this.router.navigate(['/entidad-littlepaws']);
    } else {
      this.modalMessage = 'Credenciales incorrectas.'; 
      this.mostrarModal();
    }
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
