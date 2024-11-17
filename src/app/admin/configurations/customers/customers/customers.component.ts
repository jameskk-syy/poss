import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.sass']
})
export class CustomersComponent implements OnInit {

  isLoading: boolean;
  isdata: boolean;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string [] = [
    'name',
    'code',
    'email',
    'phone'
  ];
 
  constructor() { }

  ngOnInit(): void {
  }

  getCustomers(){

  }

  addCustomer(action: string){

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
