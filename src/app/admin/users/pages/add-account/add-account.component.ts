import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { UserService } from "src/app/data/services/user.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/snackbar.service";
import { Role } from "../../data/types/role";
import { RolesLookupComponent } from "../dialogs/roles-lookup/roles-lookup.component";

@Component({
  selector: "app-add-account",
  templateUrl: "./add-account.component.html",
  styleUrls: ["./add-account.component.sass"],
})
export class AddAccountComponent extends BaseComponent implements OnInit {
  userForm: FormGroup;
  userLimit: FormGroup;
  role: any;
  roles: Role[] = [];
  departments: any[] = [
    { name: "Infrastructure" },
    { name: "Finance" },
    { name: "Security" },
  ];

  loading = false;
  

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ["", [Validators.required]],
      first_name: [""],
      last_name: [""],
      mobile: ["", [Validators.required]],
      role: [""],
      user_name: ["", [Validators.required]],
    });

  }

  onCancel() {
    this.router.navigate([`/admin/user-accounts/all`]);
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
        console.log ('results sales',this.role)
        this.userForm.patchValue({
          role: this.role.name,
        });
      }
    });
  }

  addUser(){
    this.loading = true
    this.userService.createUserAccounts(this.userForm.value).subscribe({
      next: (res) =>{
        this.loading =false
        const successMessage = res.message
        this.snackbar.showNotification("snackbar-success", successMessage);
        this.userForm.reset();
        this.userForm.markAsPristine();
      },
      error: (err) => {
        this.loading = false;
        const errorMessage = err.message
        this.snackbar.showNotification("snackbar-danger", errorMessage);
        
        }    
    })
  }
}
