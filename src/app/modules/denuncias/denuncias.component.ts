import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DenunciasService } from '../../services/denuncia/denuncia.service';
import { DenunciaResponse } from '../../models/denuncias';
import { FooterComponent } from '../../components/footer/footer.component';
import { CardDenunciasComponent } from "../../components/card-denuncias/card-denuncias.component";
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-denuncias',
  standalone: true,
  imports: [FooterComponent, CardDenunciasComponent, CommonModule, HeaderComponent, FormsModule],
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
        console.log('Datos recibidos de la API:', response);
        
        this.denuncias.forEach((denuncia) => {
          console.log('Seguimiento de denuncia:', denuncia.seguimiento); 
          denuncia.estado = denuncia.seguimiento ? 'Revisado' : 'Pendiente';
          denuncia.estado = denuncia.estado || 'Pendiente';
          
          console.log('Estado de la denuncia después de la asignación:', denuncia.estado);
        });
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
