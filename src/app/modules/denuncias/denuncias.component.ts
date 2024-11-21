import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CardDenunciasComponent } from "../../components/card-denuncias/card-denuncias.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-denuncias',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardDenunciasComponent],
  templateUrl: './denuncias.component.html',
  styleUrls: ['./denuncias.component.scss']
})
export class DenunciasComponent {
  constructor (private router : Router) {}

  enviarDenunciarForm(event : Event) {
    event.preventDefault();
    this.router.navigate(['/denuncias-form']);
  }
}
