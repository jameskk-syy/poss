import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-farmers-per-route',
  templateUrl: './farmers-per-route.component.html',
  styleUrls: ['./farmers-per-route.component.sass']
})
export class FarmersPerRouteComponent implements OnInit {
  barChartOptions: any = {};
  isLoading: boolean;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.fetchDataAndRenderChart();
    this.isLoading = true;

  }

  fetchDataAndRenderChart(): void {
    this.dashboardService.getFarmerCountPerRouteUsingGET().subscribe( res => {
        const farmers = res.entity.map(item => item.farmers);
        const routes = res.entity.map(item => item.route);

        console.log("these are the records", farmers, routes)
        if (farmers.length > 0 && routes.length > 0) {
          this.renderChart(farmers, routes);
        } else {
          console.error('Data received from backend is empty.');
        }
      (error: any) => {
        console.error('Error fetching farmer counts per route:', error);
       
      }
  });
  }

  renderChart(farmers: string[], routes: string[]): void {
    this.barChartOptions = {
      series: [{
        data: farmers,
      }],
      chart: {
        type: 'bar',
        height: 460,
        
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "30%",
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      xaxis: {
        categories: routes
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        opacity: 1,
        colors: ["#177147", "#397157", "#2D7152", "#22714D"],
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val + ' farmers';
          }
        }
      },
      legend: {
        show: false
      }
  
        
      };
   
  };
  }

