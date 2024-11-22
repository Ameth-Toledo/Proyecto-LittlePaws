import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-mascotas-extraviados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-mascotas-extraviados.component.html',
  styleUrl: './card-mascotas-extraviados.component.scss'
})
export class CardMascotasExtraviadosComponent {
  estado : string = 'Extraviado';

  @Input() name : string = "";
  @Input() imgSrc : string = "";
  @Input() namePet : string = "";
  @Input() descripciom : string = "";
  @Input() edad : string = "";
  @Input() raza : string = "";
  @Input() sexo : string = "";
  @Input() especie :string = "";
  @Input() direccion : string = "";
  @Input() telefono : string = "";
  @Input() fecha_extravio : string = "";
  @Input() fecha_publicacion : string = "";

  cambiarEstado() {
    this.estado = this.estado === 'Extraviado' ? 'Encontrado' : 'Extraviado';
  }

  /*
    1.- nombre -
    2.- raza -
    3.- edad -
    4.- sexo -
    5.- especie -
    6.- telefono -
    7.- direccion -
    8.- fecha_extravio -
    9.- fecha_publicacion -
    10.- descripcion
    11.- imagen -
  */
}
