import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CardMascotasExtraviadosComponent } from "../../components/card-mascotas-extraviados/card-mascotas-extraviados.component";

@Component({
  selector: 'app-mascotas-extraviadas',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardMascotasExtraviadosComponent],
  templateUrl: './mascotas-extraviadas.component.html',
  styleUrl: './mascotas-extraviadas.component.scss'
})
export class MascotasExtraviadasComponent {

}
