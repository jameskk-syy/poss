import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RoleManagementService } from '../../role-management/role-management.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-role-lkup',
  templateUrl: './role-lkup.component.html',
  styleUrls: ['./role-lkup.component.sass']
})
export class RoleLkupComponent implements OnInit {

  displayedColumns: string[] = [
    "id",
    "name",
    "status",
    
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
  subscription!: any;
  isdata: boolean;

  constructor(
    public dialog: MatDialog,
    // private router: Router,
    private snackbar: SnackbarService,
    private roleService: RoleManagementService,
    public dialogRef: MatDialogRef<CreateUserComponent>
  ) {}

  ngOnInit(): void {
    this.getRoles()
  }

  
  getRoles(){
    
    this.isLoading = true;
    this.subscription = this.roleService.getAllRoles().subscribe({
      next:(res) => {
        this.data = res;
        console.log('roles', res)
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
          console.error('Error fetching customer data:', err);
          this.isdata = false;
        }
    })
  }

  onSelectRole(role: any) {
    console.log('ht', role); 
    this.dialogRef.close({ role: { name: role.name, id: role.id } });
    console.log ('role nm',role )
  }

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
