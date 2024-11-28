import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { RoleManagementService } from '../role-management.service';
import { takeUntil } from 'rxjs';


const ACCESS_RIGHTS = "access-rights";

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.sass']
})
export class CreateRoleComponent extends BaseComponent implements OnInit {

  loading = false;
  roleForm: FormGroup;
  
  displayArray: { name: string; selected: boolean; accessRights: string }[] = [];
  accessRightsLoaded = false;
  dialogRef: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private roleService: RoleManagementService,
    private snackbar: SnackbarService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializeForm();

    this.loadAccessRights();
  }
  

  private initializeForm(): void {
    this.roleForm = this.fb.group({
      role: [""],
      privileges: this.fb.array([]),
    });
  }

  private loadAccessRights(): void {
    this.roleService.fetchAllAccessRights().pipe(takeUntil(this.subject)).subscribe(
        (next) => {
          this.displayArray = next.map((privilege: any) => ({
            ...privilege,
            selected: false,
          }));
          this.accessRightsLoaded = true;
        },
        (err) => {
          console.error(err);
        }
      );
  }
  
  getLocalAccessRights() {
    return JSON.parse(localStorage.getItem(ACCESS_RIGHTS));
  }

  onAccessRightChange(event: any, index: number): void {
    this.displayArray[index].selected = event.checked;
  }

  onSubmit(): void {
    const privileges = <FormArray>this.roleForm.get("privileges");
    privileges.clear();
  
    this.displayArray.forEach((item) => {
      if (item.selected) {
        privileges.push(this.fb.control(item.accessRights));
      }
    });
  
    if (this.roleForm.valid) {
      this.loading = true;
      this.roleService.createRole(this.roleForm.value).subscribe(
        {
          next: (res) => {
            
            const successMessage = res.message;
            this.snackbar.showNotification("snackbar-success", successMessage);
            this.dialogRef.close();
            // this.snackbar.alertSuccess("Role added successfully.");
            // this.router.navigate(["/admin/roles/view"]);
          },
          error: (err) => {
            this.loading = false;
            const errorMessage = err.message;
            this.snackbar.showNotification("snackbar-danger", errorMessage);
            this.dialogRef.close();
            // this.snackbar.alertWarning(err.message);
          }
        }
      );
    } else {
      this.snackbar.alertWarning("Invalid form data.");
    }
  }
  
  onCancel(){

  }
}
