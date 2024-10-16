import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table/public-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-sp-customers',
  templateUrl: './manage-sp-customers.component.html',
  styleUrls: ['./manage-sp-customers.component.sass']
})
export class ManageSpCustomersComponent implements OnInit {

  displayedColumns: string [] =[
    'select',
    'code',
    'name',
    'address',
    'location',
    'phone',
    'status'
  ]

  dataSource!: MatTableDataSource<any>;
  IsLoading: boolean;
  data: any;
  subscription!: Subscription;
  isdata: boolean = false;
  isLoading:boolean = false;
  customers: any [] = []
  


  constructor() { }

  ngOnInit(): void {
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
