import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-exito',
  standalone: true,
  imports: [],
  templateUrl: './modal-exito.component.html',
  styleUrl: './modal-exito.component.scss'
})
export class ModalExitoComponent {
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();

  closeSuccessModal() {
    this.close.emit();
  }
}
