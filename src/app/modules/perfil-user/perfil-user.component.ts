import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Input } from '@angular/core';

@Component({
  selector: 'app-perfil-user',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './perfil-user.component.html',
  styleUrl: './perfil-user.component.scss'
})
export class PerfilUserComponent {
  @Input() nameUser : string = '';
  @Input() emailUser : string = '';
}
