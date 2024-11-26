import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CardAdopcionesUserComponent } from "../../components/card-adopciones-user/card-adopciones-user.component";

@Component({
  selector: 'app-ver-adopciones-user',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardAdopcionesUserComponent],
  templateUrl: './ver-adopciones-user.component.html',
  styleUrl: './ver-adopciones-user.component.scss'
})
export class VerAdopcionesUserComponent {

}
