import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DenunciasService } from '../../services/denuncia/denuncia.service';
import { DenunciaResponse } from '../../models/denuncias';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CardDenunciasComponent } from "../../components/card-denuncias/card-denuncias.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-denuncias',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardDenunciasComponent, CommonModule],
  templateUrl: './denuncias.component.html',
  styleUrls: ['./denuncias.component.scss']
})
export class DenunciasComponent implements OnInit {
  denuncias: DenunciaResponse[] = [];

  constructor(private router: Router, private denunciasService: DenunciasService) {}

  ngOnInit(): void {
    this.getDenuncias(); 
  }

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

  enviarDenunciarForm(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/denuncias-form']);
  }
}
