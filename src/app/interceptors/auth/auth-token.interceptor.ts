import { HttpInterceptorFn } from '@angular/common/http';
import { RegisterService } from '../../services/register/register.service';
import { inject } from '@angular/core';


export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(RegisterService); // Inyecta el servicio de registro
  const token = authService.getAuthToken(); // Obtiene el token del almacenamiento

  // Imprime el token recibido en el interceptor
  console.log('Token recibido en el interceptor:', token);

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,  // Clona la solicitud y agrega el token
      },
    });
    return next(clonedRequest);  
  }

  return next(req);  // Si no hay token, sigue con la solicitud original
};

