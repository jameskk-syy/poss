import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { UserManagementService } from '../user-management.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CreateManagerComponent } from '../create-manager/create-manager.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-managers',
  templateUrl: './view-managers.component.html',
  styleUrls: ['./view-managers.component.sass']
})
export class ViewManagersComponent implements OnInit {

  displayedColumns: string[] = [
    "id",
    "firstName",
    "lastName",
    "email",
    "phoneNumber",
    "status",
    "update",
    "updatePassword",
    "actions",
  ];
  users: any[] = [];
  dataSource!: MatTableDataSource<any>;
  index: number;
  id: number;
  isLoading = true;
  loading: boolean;
  subscription: Subscription = new Subscription();
  data: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private snackbar: SnackbarService,
    private userService: UserManagementService
   ) 
  { }

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild("filter", { static: true }) filter: ElementRef;
    @ViewChild(MatMenuTrigger)
    contextMenu: MatMenuTrigger;
    contextMenuPosition = { x: "0px", y: "0px" };

    ngOnInit(): void {
      this.getManagers();
    }
  
    refresh() {
      this.getManagers();
    }
  
    addNew() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "800px";
      dialogConfig.data = {
       
      };
  
      const dilaogRef = this.dialog.open(CreateManagerComponent, dialogConfig);
  
      dilaogRef.afterClosed().subscribe(res => {
        this.getManagers();
      })
  
      
    }
    
    getManagers() {
      this.isLoading = true;
      this.subscription = this.userService.getManagers().subscribe({
          next: (res) => {
              this.data = res;
              console.log('managers', res);
              this.dataSource = new MatTableDataSource(this.data?.entity || []);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.isLoading = false;
          },
          error: (err) => {
              this.isLoading = false;
              this.snackbar.showNotification("snackbar-danger", err.message);
          }
      });
    }  
    // editCall(user) {
    //   const dialogConfig = new MatDialogConfig();
    //   dialogConfig.disableClose = false;
    //   dialogConfig.autoFocus = true;
    //   dialogConfig.width = "500px";
    //   dialogConfig.data = {
    //     user,
    //   };
  
    //   const dilaogRef = this.dialog.open(UpdateAccountComponent, dialogConfig);
  
    //   dilaogRef.afterClosed().subscribe(res => {
    //     this.getAllUsers();
    //   })
  
    //   console.log(user);
    // }
  
    // updateUserpassword(user) {
    //   const dialogConfig = new MatDialogConfig();
    //   dialogConfig.disableClose = false;
    //   dialogConfig.autoFocus = true;
    //   dialogConfig.width = "500px";
    //   dialogConfig.data = {
    //     user,
    //   };
  
    //   const dilaogRef = this.dialog.open(AdminUpdateUserPasswordComponent, dialogConfig);
  
    //   dilaogRef.afterClosed().subscribe(res => {
    //     this.getAllUsers();
    //   })
  
    // }
  
    // detailsCall(account) {
    //  const dialogRef =  this.dialog.open(AccountDetailsComponent, {
    //     data: {
    //       account: account,
    //       action: "details",
    //     },
    //     width: "800px",
    //   });
  
    //   dialogRef.afterClosed().subscribe(res => {
    //     this.getAllUsers();
    //   })
    // }
  
    // lockAccountCall(account){
    //   const dialogRef = this.dialog.open(LockAccountComponent, {
    //     data: {
    //       account: account,
    //       action: "details",
    //     },
    //     width: "500px",
    //   });
  
    //   dialogRef.afterClosed().subscribe(res => {
    //     this.getAllUsers();
    //   })
    // }
  
    // unLockAccountCall(account){
    //   const dialogRef = this.dialog.open(UnlockAccountComponent, {
    //     data: {
    //       account: account,
    //       action: "details",
    //     },
    //     width: "500px",
    //   });
  
    //   dialogRef.afterClosed().subscribe(res => {
    //     this.getAllUsers();
    //   })
    // }
  
    // deleteCall(account) {
    //   const dialogConfig = new MatDialogConfig();
    //   dialogConfig.disableClose = false;
    //   dialogConfig.autoFocus = true;
    //   dialogConfig.width = "500px";
    //   dialogConfig.data = {
    //     account,
    //   };
  
    //   const dialogRef = this.dialog.open(DeleteAccountComponent, dialogConfig);
  
    //   dialogRef.afterClosed().subscribe(res => {
    //     this.getAllUsers();
    //   })
    // }
  
    // restoreAccount(account) {
    //   const dialogConfig = new MatDialogConfig();
    //   dialogConfig.disableClose = false;
    //   dialogConfig.autoFocus = true;
    //   dialogConfig.width = "500px";
    //   dialogConfig.data = {
    //     account,
    //   };
  
    //   const dialogRef = this.dialog.open(RestoreAccountComponent, dialogConfig);
  
    //   dialogRef.afterClosed().subscribe(res => {
    //     this.getAllUsers();
    //   })
    // }
  
    // updateUser(account) {
    //   const dialogConfig = new MatDialogConfig();
    //   dialogConfig.disableClose = false;
    //   dialogConfig.autoFocus = true;
    //   dialogConfig.width = "600px";
    //   dialogConfig.data = {
    //     account,
    //   };
  
    //   const dialogRef = this.dialog.open(ModifyAccountComponent, dialogConfig);
  
    //   dialogRef.afterClosed().subscribe(res => {
    //     this.getAllUsers();
    //   })
    // }
  
    // viewAccountLogs(userId) {
    //   this.router.navigate([`admin/user-accounts/account-logs/${userId}`]);
    // }

    
  
  
    
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
    // context menu
    onContextMenu(event: MouseEvent, item: any) {
      event.preventDefault();
      this.contextMenuPosition.x = event.clientX + "px";
      this.contextMenuPosition.y = event.clientY + "px";
      this.contextMenu.menuData = { item: item };
      this.contextMenu.menu.focusFirstItem("mouse");
      this.contextMenu.openMenu();
    }

}

