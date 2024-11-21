import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  passwordVisible: boolean = false;
  modalMessage: string = '';

  constructor(private router: Router, private registerService: RegisterService) {}

  ngOnInit() {
    localStorage.clear();
    sessionStorage.clear();

    const token = sessionStorage.getItem('access_token') || localStorage.getItem('access_token');
    if (token) {
      this.checkTokenExpiration();
    }
  }

  checkTokenExpiration() {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (tokenExpiration) {
      const currentTime = new Date().getTime();
      if (currentTime > parseInt(tokenExpiration)) {
        this.registerService.logout();
        this.router.navigate(['/login']);
      }
    }
  }

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  validarFormulario(event: Event) {
    event.preventDefault();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const password = (document.getElementById('password') as HTMLInputElement).value.trim();

    if (!email || !password) {
      this.modalMessage = 'Debe llenar todos los campos.';
      this.mostrarModal();
      return;
    }

    this.registerService.login({ email, password }).subscribe(
      (response) => {
        const expirationTime = 3 * 60 * 1000; 
        const now = new Date().getTime();

        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('user_id', String(response.id_user));
        localStorage.setItem('username', response.name);
        localStorage.setItem('lastname', response.lastName);
        localStorage.setItem('email', response.email);
        localStorage.setItem('tokenExpiration', (now + expirationTime).toString()); 

        this.router.navigate(['/home']);
      },
      (error) => {
        this.modalMessage = 'Credenciales inválidas. Por favor, intente de nuevo.';
        this.mostrarModal();
      }
    );
  }

  mostrarModal() {
    const modal = document.getElementById('errorModal');
    if (modal) modal.style.display = 'flex';
  }

  closeModal() {
    const modal = document.getElementById('errorModal');
    if (modal) modal.style.display = 'none';
  }

  enviarRegister(event: Event) {
    event.preventDefault();
    this.router.navigate(['/register']);
  }
}
