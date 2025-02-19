import { Component, AfterViewInit, ViewChild, OnInit  } from '@angular/core';
// import { Chart } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

declare var Chart: any; // Declare Chart.js
declare var simpleDatatables: any; // Declare Simple DataTables

export interface DataItem {
  id: number;
  name: string;
  age: number;
  score: number;
}

const SAMPLE_DATA: DataItem[] = [
  { id: 1, name: 'Alice', age: 25, score: 92 },
  { id: 2, name: 'Bob', age: 30, score: 85 },
  { id: 3, name: 'Charlie', age: 28, score: 78 },
  { id: 4, name: 'David', age: 35, score: 88 },
  { id: 5, name: 'Eve', age: 22, score: 95 }
];


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'age', 'score'];
  dataSource = new MatTableDataSource(SAMPLE_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() {}

  ngOnInit(): void {
    this.initializeCharts();
    this.initializeDataTable();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

 applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  initializeCharts(): void {
    // Area Chart Example
    const ctxLine = document.getElementById("myAreaChart");
    new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: ["Mar 1", "Mar 2", "Mar 3", "Mar 4", "Mar 5", "Mar 6", "Mar 7", "Mar 8", "Mar 9", "Mar 10", "Mar 11", "Mar 12", "Mar 13"],
        datasets: [{
          label: "Sessions",
          lineTension: 0.3,
          backgroundColor: "rgba(2,117,216,0.2)",
          borderColor: "rgba(2,117,216,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(2,117,216,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(2,117,216,1)",
          pointHitRadius: 50,
          pointBorderWidth: 2,
          data: [10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849, 24159, 32651, 31984, 38451],
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: { unit: 'date' },
            gridLines: { display: false },
            ticks: { maxTicksLimit: 7 }
          }],
          yAxes: [{
            ticks: { min: 0, max: 40000, maxTicksLimit: 5 },
            gridLines: { color: "rgba(0, 0, 0, .125)" }
          }],
        },
        legend: { display: false }
      }
    });

    // Bar Chart Example
    const ctxBar = document.getElementById("myBarChart");
    new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [{
          label: "Revenue",
          backgroundColor: "rgba(2,117,216,1)",
          borderColor: "rgba(2,117,216,1)",
          data: [4215, 5312, 6251, 7841, 9821, 14984],
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: { unit: 'month' },
            gridLines: { display: false },
            ticks: { maxTicksLimit: 6 }
          }],
          yAxes: [{
            ticks: { min: 0, max: 15000, maxTicksLimit: 5 },
            gridLines: { display: true }
          }],
        },
        legend: { display: false }
      }
    });
  }

  initializeDataTable(): void {
    const datatablesSimple = document.getElementById('datatablesSimple');
    if (datatablesSimple) {
      new simpleDatatables.DataTable(datatablesSimple);
    }
  }
}