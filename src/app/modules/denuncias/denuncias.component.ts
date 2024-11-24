import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DenunciasService } from '../../services/denuncia/denuncia.service';
import { DenunciaResponse } from '../../models/denuncias';
import { FooterComponent } from '../../components/footer/footer.component';
import { CardDenunciasComponent } from "../../components/card-denuncias/card-denuncias.component";
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-denuncias',
  standalone: true,
  imports: [FooterComponent, CardDenunciasComponent, CommonModule, HeaderComponent],
  templateUrl: './denuncias.component.html',
  styleUrls: ['./denuncias.component.scss']
})
export class DenunciasComponent implements OnInit {
  denuncias: DenunciaResponse[] = [];

  constructor(private router: Router, private denunciasService: DenunciasService) {}

  ngOnInit(): void {
    this.getDenuncias();  // Fetch denuncias when the component initializes
  }

  // Fetch denuncias data
  getDenuncias(): void {
    this.denunciasService.getAllDenuncias().subscribe(
      (response: DenunciaResponse[]) => {
        this.denuncias = response;
      },
      (error: any) => {
        console.error('Error fetching denuncias:', error);
      }
    );
  }

  // Navigate to the denuncias form page
  enviarDenunciarForm(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/denuncias-form']);
  }
}
