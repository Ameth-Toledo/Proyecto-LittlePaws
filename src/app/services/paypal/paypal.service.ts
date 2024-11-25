import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  constructor() {}

  loadPaypalScript(): Promise<void> {
    const paypalClientId = environment.PAYPAL_CLIENT_ID; 
    return new Promise((resolve, reject) => {
      if (document.getElementById('paypal-script')) {
        resolve(); 
        return;
      }
      const scriptElement = document.createElement('script');
      scriptElement.id = 'paypal-script';
      scriptElement.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=MXN`;
      scriptElement.onload = () => resolve();
      scriptElement.onerror = () => reject(new Error('Error al cargar el script de PayPal'));
      document.body.appendChild(scriptElement);
    });
  }
}
