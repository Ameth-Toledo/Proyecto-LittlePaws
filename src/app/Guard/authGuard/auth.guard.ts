import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(RegisterService); // Inyecta el servicio de autenticación
  const router = inject(Router); // Inyecta el servicio de router

  const token = authService.getAuthToken(); // Obtiene el token

  console.log('Token recibido en guard:', token);  // Muestra el token recibido

  if (token) {
    const tokenExpirado = authService.isTokenExpired(); // Verifica si el token ha expirado
    
    if (tokenExpirado) {
      console.log('El token ha expirado.');
      authService.logout(); // Si el token ha expirado, hace logout
      router.navigate(['/login']); // Redirige al login
      return false; // Evita el acceso a la ruta protegida
    }

    console.log('Token válido, acceso permitido.');
    return true; // Si el token es válido y no ha expirado, permite el acceso
  } else {
    console.log('No se encontró token, redirigiendo al login.');
    router.navigate(['/login']); // Si no hay token, redirige al login
    return false; // Evita el acceso a la ruta protegida
  }
};

