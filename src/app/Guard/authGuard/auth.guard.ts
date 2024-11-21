import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(RegisterService); 
  const router = inject(Router); 

  const token = authService.getAuthToken(); 

  console.log('Token recibido en guard:', token); 

  if (token) {
    const tokenExpirado = authService.isTokenExpired(); 
    
    if (tokenExpirado) {
      console.log('El token ha expirado.');
      authService.logout();
      router.navigate(['/login'], { replaceUrl: true });
      return false; 
    }

    console.log('Token válido, acceso permitido.');
    return true; 
  } else {
    console.log('No se encontró token, redirigiendo al login.');
    router.navigate(['/login'], { replaceUrl: true });
    return false; 
  }
};

