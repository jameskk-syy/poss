import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { RoleManagementService } from '../role-management.service';
import { Subject, takeUntil } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { ViewRolesComponent } from '../view-roles/view-roles.component';


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
  accessRightsSubject: Subject<any[]> = new Subject<any[]>();

  private basicActionsAddOns: {
    name: string;
    selected: boolean;
    accessRights: string;
  }[];
  

  constructor(
    public dialogRef: MatDialogRef<ViewRolesComponent>,
    private fb: FormBuilder,
    private router: Router,
    private roleService: RoleManagementService,
    private snackbar: SnackbarService,
    
  ) {
    super();
    this.getAccessRights();
  }

  ngOnInit(): void {
    this. getAccessRights ();
    
    this.initializeForm();

    this.loadAccessRights();
  }
  

  private initializeForm(): void {
    this.roleForm = this.fb.group({
      role: [""],
      privileges: this.fb.array([]),
    });
  }

  toUpperCase(event: any): void {
    const value = event.target.value;
    event.target.value = value.toUpperCase();
  }

  getAccessRights = () => {
  this.roleService.fetchAllAccessRights().pipe(takeUntil(this.subject)).subscribe({
      next: (res) => {
        this.basicActionsAddOns = res.map((privilege) => ({
          ...privilege,
          selected: false,
        }));
        console.log("access", this.basicActionsAddOns)

        this.displayArray = [...this.basicActionsAddOns];
        // Update local storage with the processed data
        localStorage.removeItem(ACCESS_RIGHTS);
        localStorage.setItem(ACCESS_RIGHTS, JSON.stringify(this.basicActionsAddOns));

        // Optionally emit the data using a Subject or BehaviorSubject
        this.accessRightsSubject.next(this.basicActionsAddOns);
        
        // Set flag to indicate data is loaded
        this.accessRightsLoaded = true;
        console.log("Access Rights Loaded:", this.displayArray);
      
      },
      error: (err) => {
        console.error("Error fetching access rights:", err);
      },
    });
  };

  toggleAll(selected: boolean) {
    this.displayArray.forEach((privilege) => (privilege.selected = selected));
  }

  onChange(e: any, i: any) {
    this.displayArray[i].selected = e.checked;
  }

  allSelected() {
    return this.displayArray.every((privilege) => privilege.selected);
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

  
  
  onClick(){
    this.dialogRef.close();
  }
}
