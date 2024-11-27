import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { UserService } from "src/app/data/services/user.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/snackbar.service";
import { ActiveAccountsComponent } from "../active-accounts/active-accounts.component";
import { RolesLookupComponent } from "../dialogs/roles-lookup/roles-lookup.component";

@Component({
  selector: "app-modify-account",
  templateUrl: "./modify-account.component.html",
  styleUrls: ["./modify-account.component.sass"],
})
export class ModifyAccountComponent extends BaseComponent implements OnInit {
  user: any;
  userId: any;
  loading: boolean;
  accountForm: FormGroup;
  role: any;
  roleId: any;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ActiveAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
    private snackbar: SnackbarService,
    private router: Router
  ) {
    super();

    this.user = data.account;

    this.userId = this.user.id;
  }

  ngOnInit(): void {
    this.updateAccountForm();
    // this.getRoles();
  }

  updateAccountForm() {
    this.accountForm = this.fb.group({
      role: ["", [Validators.required]],
      username: [this.user.username, [Validators.required]]
    });
  }

 
  updateAccount() {
    this.loading = true

    const data = {
      ...this.accountForm.value,
      roleId: this.roleId
    }
    this.userService.updateUserRole(data).subscribe({
        next: (res) =>{
          this.loading =false
          const successMessage = res.message
          this.snackbar.showNotification("snackbar-success", successMessage);
          this.accountForm.reset();
          
        },
        error: (err) => {
          this.loading = false;
          const errorMessage = err.message
          this.snackbar.showNotification("snackbar-danger", errorMessage);
          
          }    
      })
    }

  roleLookup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
     
    };
  
    const dialogRef = this.dialog.open(RolesLookupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.role = result.data;
        this.roleId = this.role.id
        console.log ('results sales',this.role)
        this.accountForm.patchValue({
          role: this.role.name,
        });
       
        console.log ('results sales',this.roleId)
      }
    });
  }
  
  
  onNoClick() {
    this.dialogRef.close();
  }
}
