import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-card-comentarios',
  standalone: true,
  imports: [],
  templateUrl: './card-comentarios.component.html',
  styleUrl: './card-comentarios.component.scss'
})
export class CardComentariosComponent {
  @Input() comentario : string = '';
}
