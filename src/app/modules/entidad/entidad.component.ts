import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-entidad',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './entidad.component.html',
  styleUrl: './entidad.component.scss'
})
export class EntidadComponent {

}
