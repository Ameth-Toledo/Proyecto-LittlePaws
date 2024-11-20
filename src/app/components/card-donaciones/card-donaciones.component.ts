import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaypalService } from '../../services/paypal/paypal.service';

@Component({
  selector: 'app-card-donaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-donaciones.component.html',
  styleUrls: ['./card-donaciones.component.scss']
})
export class CardDonacionesComponent {
  @Input() tituloDonacion: string = '';
  @Input() imagenCausa: string = '';
  @Input() descripcionCausa: string = '';
  @Input() porcentajeDonacion: number = 0;
  @Input() metaDonacion: number = 0;
  @Input() cantidadDonada: number = 0;

  modalAbierto: boolean = false;
  modalExito: boolean = false;
  modalError: boolean = false;
  modalAdvertencia: boolean = false;
  cantidadDonacion: number | null = null;
  private scriptLoaded = false;

  constructor(private paypalService: PaypalService) {}

  abrirModal() {
    this.modalAbierto = true;
    if (!this.scriptLoaded) {
      this.paypalService.loadPaypalScript().then(() => {
        this.scriptLoaded = true;
        this.renderizarBotonPaypal();
      }).catch((error) => {
        console.error(error);
        this.modalError = true;
      });
    } else {
      this.renderizarBotonPaypal();
    }
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.modalExito = false;
    this.modalError = false;
    this.modalAdvertencia = false;
    this.cantidadDonacion = null;
  }

  realizarDonacion() {
    if (this.cantidadDonacion !== null && this.cantidadDonacion > 0) {
      console.log(`Donación de ${this.cantidadDonacion} realizada.`);
      this.modalExito = true;
      this.modalAbierto = false;
    } else if (this.cantidadDonacion !== null && this.cantidadDonacion <= 0) {
      this.modalAdvertencia = true;
    } else {
      this.modalError = true;
    }
  }

  private renderizarBotonPaypal() {
    const paypalContainerId = 'paypal-button-container';
    let paypalContainer = document.getElementById(paypalContainerId);
  
    if (paypalContainer) {
      paypalContainer.remove();
      const newContainer = document.createElement('div');
      newContainer.id = paypalContainerId;
      const modalContent = document.querySelector('.modal-content');
      
      if (modalContent) {
        modalContent.classList.add('modal-content--expandido'); 
      }
      
      modalContent?.appendChild(newContainer);
      paypalContainer = newContainer;
    }
  
    if (paypalContainer) {
      (window as any).paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          const donationAmount = this.cantidadDonacion?.toFixed(2) || '0.00';
          if (parseFloat(donationAmount) <= 0) {
            console.error('Invalid donation amount');
            this.modalAdvertencia = true;
            return Promise.reject(new Error('Invalid donation amount'));
          }
          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: 'MXN', 
                value: donationAmount
              }
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then(() => {
            this.modalExito = true;
            this.cerrarModal();
          });
        },
        onError: (err: any) => {
          console.error('Error en el pago de PayPal:', err);
          this.modalError = true;
        }
      }).render(paypalContainer);
    }
  }
  
}
