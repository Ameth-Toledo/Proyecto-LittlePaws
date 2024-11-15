import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RegisterService } from '../../services/register/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private router: Router, private registerService: RegisterService) {}

  enviarLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(['/login']);
  }

  togglePassword(inputId: string) {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    inputElement.type = inputElement.type === 'password' ? 'text' : 'password';
  }

  validarFormulario(event: Event) {
    event.preventDefault();

    const name = (document.getElementById('user') as HTMLInputElement).value;
    const lastName = (document.getElementById('lastname') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const passwordConfirm = (document.getElementById('password-confirm') as HTMLInputElement).value;

    if (!name || !lastName || !email || !password || !passwordConfirm) {
      this.mostrarModal();
    } else if (!email.includes('@')) {
      this.mostrarEmailErrorModal();
    } else if (password !== passwordConfirm) {
      this.mostrarPasswordMismatchModal();
    } else {
      this.registerService.addUser({ nombre_completo: { name, last_name: lastName }, email, password, rol: 'usuario' }).subscribe(
        () => {
          console.log('Usuario registrado en la base de datos');
          this.mostrarSuccessModal();
        },
        (error) => {
          console.error('Error en el registro:', error);
          this.mostrarModal();
        }
      );
    }
  }

  mostrarEmailErrorModal() {
    const modal = document.getElementById('emailErrorModal')!;
    modal.style.display = 'flex';
  }

  closeEmailErrorModal() {
    const modal = document.getElementById('emailErrorModal')!;
    modal.style.display = 'none';
  }

  mostrarPasswordMismatchModal() {
    const modal = document.getElementById('passwordMismatchModal')!;
    modal.style.display = 'flex';
  }

  closePasswordMismatchModal() {
    const modal = document.getElementById('passwordMismatchModal')!;
    modal.style.display = 'none';
  }

  mostrarSuccessModal() {
    const modal = document.getElementById('successModal')!;
    modal.style.display = 'flex';
  }

  closeSuccessModal() {
    const modal = document.getElementById('successModal')!;
    modal.style.display = 'none';
  }

  mostrarModal() {
    const modal = document.getElementById('errorModal')!;
    modal.style.display = 'flex';
  }

  closeModal() {
    const modal = document.getElementById('errorModal')!;
    modal.style.display = 'none';
  }
}
