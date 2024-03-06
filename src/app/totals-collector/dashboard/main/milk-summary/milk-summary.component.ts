import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-milk-summary',
  templateUrl: './milk-summary.component.html',
  styleUrls: ['./milk-summary.component.sass']
})
  export class MilkSummaryComponent implements OnInit {
    service: any;
    constructor() { }
    // Define your data source and columns
    dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = ['routeName', 'totalMilkReceived'];
  
    // Fetch data from the backend and set it to the dataSource
    ngOnInit(): void {
      // Assuming you have a service to fetch data from the backend
      // Replace this with your actual service call
      this.service.getCollectRoutes().subscribe((data: any[]) => {
        console.log("data", data)
        this.dataSource = new MatTableDataSource(data);
      });
    }
  }