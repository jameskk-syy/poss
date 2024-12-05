import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RoleLkupComponent } from '../role-lkup/role-lkup.component';
import { ViewUsersComponent } from '../view-users/view-users.component';
import { UserManagementService } from '../user-management.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ViewManagersComponent } from '../view-managers/view-managers.component';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.sass']
})
export class CreateUserComponent implements OnInit {

  loading: any;
  userForm: FormGroup
  role: any;
  roleName: any;
  name: any;
  subscription!: Subscription;
  roles: any;


  constructor(
    public dialogRef: MatDialogRef<ViewManagersComponent>,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private userService: UserManagementService,
    private snackbar: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      user_name: ["", [Validators.required]],
      first_name: ["", [Validators.required]],
      last_name: ["", [Validators.required]],
      email: ["", [Validators.required]],
      mobile: ["", [Validators.required]],
      role: ["", [Validators.required]],
      password: ["",[Validators.required]] 
      
    })
  }

  selectRole() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
     
    };
  
    const dialogRef = this.dialog.open(RoleLkupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.roles = result.role;
        console.log ('results role',this.roles)

        this.userForm.patchValue({
          roleId: this.roles.id,
          role: this.roles.name
        });

      }
    });
  }

  onClick() {
    this.dialogRef.close();
  }
 

  createUser(){
  
      this.subscription = this.userService.createUser(this.userForm.value).subscribe({
        next: (res) => {
        this.loading = false;
        console.log ('jhdjh', this.userForm )
        const successMessage = res.message
        this.snackbar.showNotification("snackbar-success", successMessage);
        this.userForm.reset();
        this.dialogRef.close();
        }, 
      error: (err) => {
        this.loading = false;
        const errorMessage = err.message
        this.snackbar.showNotification("snackbar-danger", errorMessage);
        this.dialogRef.close();
        }
      }
    )
  }

  // buildPayload(user: any) {
  //   let data = {
  //     "user_name": user.user_name,
  //     "first_name": user.first_name,
  //     "last_name": user.last_name,
  //     "email": user.email,
  //     "mobile": user.mobile,
  //     "role": user.roles.id,
  //     "password": user.password
  //   }
  //   return data;
  // }
//(this.buildPayload(this.userForm.value))
  }

