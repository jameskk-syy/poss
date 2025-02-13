import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleManagementService } from '../role-management.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.sass'],
})
export class CreateRoleComponent implements OnInit {
  roleForm: FormGroup;
  displayArray: { name: string; accessRights: string; selected: boolean }[] = [];
  accessRightsLoaded = false;
  loading = false;
  title: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: string; role?: any },
    private roleService: RoleManagementService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchAccessRights();
    console.log('data actions', this.data);
    if (this.data.action === 'edit' && this.data.role) {
      this.title = 'Edit Role';
      this.populateForm(this.data.role);
    } else {
      this.title = 'Create New Role';
    }

  }

  private initializeForm(): void {
    this.roleForm = this.fb.group({
      role: ['', Validators.required],
    });
  }

  fetchAccessRights(): void {
    this.roleService.fetchAllAccessRights().subscribe({
      next: (rights) => {
        // Map all available access rights into displayArray
        this.displayArray = rights.map((priv) => ({
          name: priv.name,
          accessRights: priv.accessRights,
          selected: false, // Default to unselected
        }));
  
        // If editing, pre-select existing privileges
        if (this.data.action === 'edit' && this.data.role?.privileges) {
          const existingPrivileges = this.data.role.privileges;
          this.displayArray.forEach((item) => {
            if (existingPrivileges.includes(item.accessRights)) {
              item.selected = true; // Mark privilege as selected
            }
          });
        }
  
        // Mark access rights as loaded
        this.accessRightsLoaded = true;
      },
      error: (err) => {
        console.error('Error fetching access rights:', err);
      },
    });
  }
  
  
  

  populateForm(role: any): void {
    this.roleForm.patchValue({
      role: role.name,
    });
  }

  toggleAll(selected: boolean): void {
    this.displayArray.forEach((item) => (item.selected = selected));
  }

  allSelected(): boolean {
    return this.displayArray.every((item) => item.selected);
  }

  onChange(event: any, index: number): void {
    this.displayArray[index].selected = event.checked;
  }

  onSubmit(): void {
    const privileges = this.displayArray
      .filter((item) => item.selected)
      .map((item) => item.accessRights);

    if (this.roleForm.valid) {
      const formData = { ...this.roleForm.value, privileges };
      this.loading = true;

      if (this.data.action === 'add') {
        this.addRole(formData);
      } else if (this.data.action === 'edit') {
        this.updateRole({ ...this.data.role, ...formData });
      }
    } else {
      this.snackbar.alertWarning('Please fill in all required fields.');
    }
  }

  addRole(data: any): void {
    this.roleService.createRole(data).subscribe({
      next: (res) => {
        this.snackbar.showNotification('snackbar-success', res.message);
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.loading = false;
        this.snackbar.showNotification('snackbar-danger', err.message);
      },
    });
  }

  updateRole(data: any): void {
    this.roleService.updateRole(data).subscribe({
      next: (res) => {
        this.snackbar.showNotification('snackbar-success', res.message);
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.loading = false;
        this.snackbar.showNotification('snackbar-danger', err.message);
      },
    });
  }

  onClick(): void {
    this.dialogRef.close();
  }

  toUpperCase(event: any): void {
    const value = event.target.value;
    event.target.value = value.toUpperCase();
  }
}
