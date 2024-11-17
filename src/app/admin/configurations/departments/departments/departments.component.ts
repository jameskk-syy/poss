import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.sass']
})
export class DepartmentsComponent implements OnInit {

  isLoading: boolean;
  isdata: boolean;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string [] = [
    'name',
    'code'
  ];
 
  constructor() { }

  ngOnInit(): void {
  }

  getDepartments(){

  }

  addDepartment(action: string){

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
