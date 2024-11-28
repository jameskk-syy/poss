import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { CreateRoleComponent } from '../create-role/create-role.component';

@Component({
  selector: 'app-view-roles',
  templateUrl: './view-roles.component.html',
  styleUrls: ['./view-roles.component.sass']
})
export class ViewRolesComponent implements OnInit {

  displayedColumns: string[] = [
    "id",
    "name",
    "postedBy",
    "postedTime",
    "actions",
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  // selection = new SelectionModel<any>(true, []);
  data: any;
  error: any;
  isLoading: boolean = true;
  Roles: any[] = [];
  currentUser: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
  }

  refresh(){
    this.getManagerRoles
  }

  getManagerRoles(){

  }

  addRoleCall(){
    const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "800px";
      dialogConfig.data = {
       
      };
  
      const dilaogRef = this.dialog.open(CreateRoleComponent, dialogConfig);
  
      dilaogRef.afterClosed().subscribe(res => {
        this.getManagerRoles();
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
