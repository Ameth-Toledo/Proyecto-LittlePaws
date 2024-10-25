import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

//agregare aqui la clase pa que prueve que si jala XD
interface User {
  username : string;
  email : string;
  password : string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  //agregare esto para probar con un arreglo que se guarden los usuarios
  usuarios : User[] = [];

  //de aqui pa abajo ni hay que moverle XD ya jalaaaaa
  constructor(private router : Router) {}

  enviarLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(['/login']);
  }

  togglePassword(inputId: string) {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    inputElement.type = inputElement.type === 'password' ? 'text' : 'password';
  }

  //aqui modificare el metodo pa ver si jala tambien
  validarFormulario(event: Event) {
    event.preventDefault();

    const username = (document.getElementById('user') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const passwordConfirm = (document.getElementById('password-confirm') as HTMLInputElement).value;

    if (!username || !email || !password || !passwordConfirm) {
      this.mostrarModal(); 
    } 
    else if (!email.includes('@')) {
      this.mostrarEmailErrorModal(); 
    } 
    else if (password !== passwordConfirm) {
      this.mostrarPasswordMismatchModal(); 
    } 
    else {
      const nuevoUsuario: User = {
        username: username,
        email: email,
        password: password,
      };
      
      this.usuarios.push(nuevoUsuario);

      console.log('Usuarios registrados:', this.usuarios); 

      this.mostrarSuccessModal(); 
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
