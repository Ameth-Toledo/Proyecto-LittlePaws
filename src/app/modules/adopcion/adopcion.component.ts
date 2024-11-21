import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CardAnimalesComponent } from "../../components/card-animales/card-animales.component";

@Component({
  selector: 'app-adopcion',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardAnimalesComponent],
  templateUrl: './adopcion.component.html',
  styleUrls: ['./adopcion.component.scss']
})
export class AdopcionComponent {
 
}