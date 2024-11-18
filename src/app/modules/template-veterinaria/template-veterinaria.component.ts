import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { VeterinariaHeadComponent } from "../../components/veterinaria-head/veterinaria-head.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-template-veterinaria',
  standalone: true,
  imports: [HeaderComponent, VeterinariaHeadComponent, FooterComponent],
  templateUrl: './template-veterinaria.component.html',
  styleUrl: './template-veterinaria.component.scss'
})
export class TemplateVeterinariaComponent {
  @Input() linkGoogleMaps : string = '';
  refugioData: any;

  selectedOption: string = 'fotos';

  selectOption(option : string): void {
    this.selectedOption = option;
  }

  constructor(private router: Router, private route: ActivatedRoute) {
    this.refugioData = this.router.getCurrentNavigation()?.extras.state || {};
  }
}
