import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-stock-statistics',
  templateUrl: './stock-statistics.component.html',
  styleUrls: ['./stock-statistics.component.sass']
})
export class StockStatisticsComponent implements OnInit {
  cardChart2Label: string[];
  cardChart2Data: { label: string; data: number[]; borderWidth: number; pointStyle: string; pointRadius: number; borderColor: string; pointBackgroundColor: string; backgroundColor: string; pointBorderColor: string; }[];
  cardChart2: { responsive: boolean; tooltips: { enabled: boolean; }; legend: { display: boolean; }; scales: { yAxes: { gridLines: { display: boolean; drawBorder: boolean; }; ticks: { beginAtZero: boolean; display: boolean; }; }[]; xAxes: { gridLines: { drawBorder: boolean; display: boolean; }; ticks: { display: boolean; }; }[]; }; title: { display: boolean; }; };

  constructor() { }

  ngOnInit(): void {
  }

  private initializeChart() {
    this.cardChart2Data = [
        {
            label: "New Clients",
            data: [50, 61, 80, 50, 40, 93, 63, 50, 62, 72, 52, 60, 41, 30, 45, 70],
            borderWidth: 4,
            pointStyle: "circle",
            pointRadius: 4,
            borderColor: "rgba(253,126,20,.7)",
            pointBackgroundColor: "rgba(253,126,20,.2)",
            backgroundColor: "rgba(253,126,20,.2)",
            pointBorderColor: "transparent",
        },
    ];

    this.cardChart2Label = [
        "16-07-2018",
        "17-07-2018",
        "18-07-2018",
        "19-07-2018",
        "20-07-2018",
        "21-07-2018",
        "22-07-2018",
        "23-07-2018",
        "24-07-2018",
        "25-07-2018",
        "26-07-2018",
        "27-07-2018",
        "28-07-2018",
        "29-07-2018",
        "30-07-2018",
        "31-07-2018",
    ];

    this.cardChart2 = {
        responsive: true,
        tooltips: {
            enabled: false,
        },
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                gridLines: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    beginAtZero: true,
                    display: false,
                },
            }],
            xAxes: [{
                gridLines: {
                    drawBorder: false,
                    display: false,
                },
                ticks: {
                    display: false,
                },
            }],
        },
        title: {
            display: false,
        },
    };
}

}
