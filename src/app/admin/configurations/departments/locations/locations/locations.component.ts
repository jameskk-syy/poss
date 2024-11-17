import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.sass']
})
export class LocationsComponent implements OnInit {

  isLoading: boolean;
  isdata: boolean;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string [] = [
    'name',
    'code',
    'department'
  ];
 
  constructor() { }

  ngOnInit(): void {
  }

  getLocations(){

  }

  addLocation(action: string){

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}