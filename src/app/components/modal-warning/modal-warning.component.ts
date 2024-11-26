import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-warning',
  standalone: true,
  imports: [],
  templateUrl: './modal-warning.component.html',
  styleUrl: './modal-warning.component.scss'
})
export class ModalWarningComponent {
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();

  closePasswordMismatchModal() {
    this.close.emit();
  }
}
