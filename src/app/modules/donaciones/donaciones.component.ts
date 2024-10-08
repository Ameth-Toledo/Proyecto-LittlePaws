import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CardDonacionesComponent } from "../../components/card-donaciones/card-donaciones.component";

@Component({
  selector: 'app-donaciones',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardDonacionesComponent],
  templateUrl: './donaciones.component.html',
  styleUrl: './donaciones.component.scss'
})
export class DonacionesComponent {

}
