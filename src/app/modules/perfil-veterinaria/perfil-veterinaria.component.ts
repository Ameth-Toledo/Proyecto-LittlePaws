import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { VeterinariaHeadComponent } from "../../components/veterinaria-head/veterinaria-head.component";

@Component({
  selector: 'app-perfil-veterinaria',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, VeterinariaHeadComponent],
  templateUrl: './perfil-veterinaria.component.html',
  styleUrl: './perfil-veterinaria.component.scss'
})
export class PerfilVeterinariaComponent {

}
