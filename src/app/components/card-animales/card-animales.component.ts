import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-card-animales',
  standalone: true,
  imports: [],
  templateUrl: './card-animales.component.html',
  styleUrl: './card-animales.component.scss'
})
export class CardAnimalesComponent {
  @Input() name : string = "";
  @Input() imgSrc : string = "";
}
