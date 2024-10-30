import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-invoice-items',
  templateUrl: './view-invoice-items.component.html',
  styleUrls: ['./view-invoice-items.component.sass']
})
export class ViewInvoiceItemsComponent implements OnInit {

  
  displayedColumns: string[] = [

  ]

  dataSource!: MatTableDataSource<any>;
  isLoading: boolean = false
  isdata: boolean = false
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
