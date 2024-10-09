import { Component, OnInit } from '@angular/core';
import { Chart, LinearScale, BarElement, Title, BarController, CategoryScale } from 'chart.js';

@Component({
  selector: 'app-indices-abandono',
  standalone: true,
  imports: [],
  templateUrl: './indices-abandono.component.html',
  styleUrl: './indices-abandono.component.scss'
})
export class IndicesAbandonoComponent implements OnInit {
  ngOnInit() {
    Chart.register(LinearScale, BarElement, BarController, Title, CategoryScale);
    
    this.createChart();
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    if (ctx) {
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
          datasets: [{
            label: 'Índices de Abandono en Chiapas',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('No se pudo encontrar el canvas con el ID "myChart".');
    }
  }
}
