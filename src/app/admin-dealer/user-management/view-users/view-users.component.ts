import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserManagementService } from '../user-management.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { CreateUserComponent } from '../create-user/create-user.component';


@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.sass']
})
export class ViewUsersComponent implements OnInit {

  displayedColumns: string[] = [
    "id",
    "username",
    "firstname",
    "lastname",
    "phonenumber",
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
      // this.getAllUsers();
    }
  
    refresh() {
      // this.getAllUsers();
    }
  
    addNew() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "800px";
      dialogConfig.data = {
       
      };
  
      const dilaogRef = this.dialog.open(CreateUserComponent, dialogConfig);
  
      dilaogRef.afterClosed().subscribe(res => {
        this.getAllUsers();
      })
  
      
    }
    

    getAllUsers() {}
    // getAllUsers() {
    //   this.userService.fetchAllUserAccounts()
    //     .pipe(takeUntil(this.subject))
    //     .subscribe(
    //       (res) => {
    //         this.users = res.userData;
  
  
    //         if (this.users.length > 0) {
    //           this.isLoading = false;
  
    //           this.dataSource = new MatTableDataSource<any>(this.users);
    //           this.dataSource.paginator = this.paginator;
    //           this.dataSource.sort = this.sort;
    //         }
    //       },
    //       (err) => {
    //         console.log(err);
    //       }
    //     );
    // }
  
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
