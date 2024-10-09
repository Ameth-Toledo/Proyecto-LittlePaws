import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-veterinaria-head',
  standalone: true,
  imports: [],
  templateUrl: './veterinaria-head.component.html',
  styleUrl: './veterinaria-head.component.scss'
})
export class VeterinariaHeadComponent {
  @Input() nameVeterinaria : string = '';
  @Input() descripcionVeterinaria : string = '';
  @Input() imgSrc : string = '';
  @Input() telefonoVeterinaria : string = '';
  @Input() emailVeterinaria : string = '';
  @Input() direccionVeterinaria : string = '';
  @Input() horarioVeterinaria : string = '';
} 
