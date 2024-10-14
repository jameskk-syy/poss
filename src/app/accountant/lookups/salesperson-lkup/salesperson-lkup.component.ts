import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SalespersonComponent } from '../../salesperson/salesperson/salesperson.component';
import { LookupsService } from '../lookups.service';
import { SalesService } from 'src/app/staff/sales/services/sales.service';

@Component({
  selector: 'app-salesperson-lkup',
  templateUrl: './salesperson-lkup.component.html',
  styleUrls: ['./salesperson-lkup.component.sass']
})
export class SalespersonLkupComponent implements OnInit {
  
  displayedColumns: string [] =[
    'username',
    'firstName',
    'lastName',
    'mobile',
    'status',
    'roles'
  ]

  dataSource!: MatTableDataSource<any>;
  IsLoading: boolean;
  subscription!: Subscription;
  isdata: boolean = false;
  isLoading:boolean = false;
  data: any;
  salesPerson: any[] = []
  
 

  constructor(
    private salespersonService: SalesService,
    private lookupsService: LookupsService,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<SalespersonComponent>
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.getData()
   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getData() {
    this.isLoading = true;
    this.subscription = this.lookupsService.getSalesperson().subscribe({
      next:(res) => {
        this.data = res;
        console.log('sales persssss', res)
          if (this.data.userData.length > 0) {
            this.isLoading = false;
            this.isdata = true;
            // Binding with the datasource
            this.dataSource = new MatTableDataSource(this.data.userData);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
            this.isLoading = false;
            this.dataSource = new MatTableDataSource<any>(this.data);
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error fetching stock data:', err);
          this.isdata = false;
        }
    })
  }

  onSelectSalesperson(salesperson: any) {
    console.log(salesperson); 
    this.dialogRef.close({ salesperson: { name: salesperson.username, id: salesperson.id } });
  }

}
