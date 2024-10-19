import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CardDenunciasComponent } from "../../components/card-denuncias/card-denuncias.component";

@Component({
  selector: 'app-denuncias',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardDenunciasComponent],
  templateUrl: './denuncias.component.html',
  styleUrl: './denuncias.component.scss'
})
export class DenunciasComponent {

}
