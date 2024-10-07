import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AssignWarehouseComponent } from '../../inventory/warehouse/assign-warehouse/assign-warehouse.component';
import { LookupsService } from '../lookups.service';

@Component({
  selector: 'app-user-lookup',
  templateUrl: './user-lookup.component.html',
  styleUrls: ['./user-lookup.component.sass']
})
export class UserLookupComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "username",
    "status",
    "mobile"
  ];
  isdata: boolean = false;
  
  subscription!: Subscription;
  data: any;
  dataSource!: MatTableDataSource<any>;
  isLoading: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: LookupsService,
    public dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<AssignWarehouseComponent>
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.subscription = this.service.getUsers().subscribe(res => {
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
        this.dataSource = new MatTableDataSource<any>(null);
      }
    })
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
 onSelectRow(user: any) {
  console.log(user); 
  this.dialogRef.close({ data: { username: user.username, id: user.id } });
}

}
