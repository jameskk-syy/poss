import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SalespersonService } from '../salesperson.service';

@Component({
  selector: 'app-manage-salesperson',
  templateUrl: './manage-salesperson.component.html',
  styleUrls: ['./manage-salesperson.component.sass']
})
export class ManageSalespersonComponent implements OnInit {

  loading: boolean = false;
  isLoading: boolean = false;
  isdata: any;
  dataSource!: MatTableDataSource<any>;



  displayedColumns: string [] = [
    'id',
    'action'
  ]

  constructor(
    private salespersonService: SalespersonService,

  ) { }

  ngOnInit() {
    this.getData()
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getData(){

  }

  

}
