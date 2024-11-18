import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigurationsService } from '../../configurations.service';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddDepartmentComponent } from '../add-department/add-department.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.sass']
})
export class DepartmentsComponent implements OnInit {

  isLoading: boolean;
  isdata: boolean;
  data: any;
  subscription!: Subscription;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string [] = [
    'id',
    'name',
    'code',
    'action'
  ];
 

 
  constructor(
    private dialog: MatDialog,
    private configurationService: ConfigurationsService
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
  }

  addDepartment(action:string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "600px"
    dialogConfig.data = { 
      action:action
    }
    console.log('action is',action)
  

    const dialogRef = this.dialog.open(AddDepartmentComponent, dialogConfig);
      dialogRef.afterClosed().subscribe ({
      next:(value) => {
        this.ngOnInit()
      }
      });
    }


  editDepartment(department:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "600px"
    dialogConfig.data = { 
      department: department
    }
    
  

    const dialogRef = this.dialog.open(AddDepartmentComponent, dialogConfig);
      dialogRef.afterClosed().subscribe ({
      next:(value) => {
        this.ngOnInit()
      }
      });
  }
  
  
  getDepartments(){
    this.isLoading = true;
    this.subscription = this.configurationService.getDepartments().subscribe({
      next:(res) => {
        this.data = res;
        console.log('custommm', res)
          if (this.data.entity.length > 0) {
            this.isLoading = false;
            this.isdata = true;
            // Binding with the datasource
            this.dataSource = new MatTableDataSource(this.data.entity);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
            this.isLoading = false;
            this.dataSource = new MatTableDataSource<any>(this.data);
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error fetching departments data:', err);
          this.isdata = false;
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
}
