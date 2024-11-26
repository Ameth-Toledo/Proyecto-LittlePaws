import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-error',
  standalone: true,
  imports: [],
  templateUrl: './modal-error.component.html',
  styleUrl: './modal-error.component.scss'
})
export class ModalErrorComponent {
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
