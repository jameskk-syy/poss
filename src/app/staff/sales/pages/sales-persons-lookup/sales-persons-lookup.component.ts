import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddPickupComponent } from 'src/app/admin/pick-up-locations/add-pickup/add-pickup.component';
import { SubcountiesService } from 'src/app/admin/sub-counties/subcounties.service';
import { SalesService } from '../../services/sales.service';

@Component({
  selector: 'app-sales-persons-lookup',
  templateUrl: './sales-persons-lookup.component.html',
  styleUrls: ['./sales-persons-lookup.component.sass']
})
export class SalesPersonsLookupComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
  ];


  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  index: number;
  id: number;
  isdata: boolean = false;
  isLoading: boolean;
  subscription!: Subscription;
  data: any;

  constructor(
    private service: SalesService,
    public dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<AddPickupComponent>
  ) { }


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.getData();
  
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


    close() {
    this.dialogRef.close();
  }

  onSelectRow(data: any) {
    this.dialogRef.close({data });
  }

  getData() {
    this.isLoading = true;
    this.subscription = this.service.fetchSalesPersons().subscribe(res => {
      this.data = res;
      if (this.data.userData.length > 0) {
        this.isLoading = false;
        this.isdata = true;
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.data.userData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else {
        this.isdata = false;
        this.dataSource = new MatTableDataSource<any>(this.data);
      }
    })
  }

}
