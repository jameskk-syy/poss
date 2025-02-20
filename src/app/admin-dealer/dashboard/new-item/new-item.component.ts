import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.sass']
})
export class NewItemComponent implements OnInit {

  newItem: FormGroup;
  branches: any[] = []; // Store fetched branches
  isEditMode = false;        // Toggle for add/edit mode
  editingItemId: number | null = null; // Store ID of the item being edited

  

  constructor(private fb: FormBuilder,private dashboardService:DashboardService) { 
    // Initialize the form group with controls
    this.newItem = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      count: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // Only numbers for quantity
      branchId: ['', [Validators.required]] // Selected branch ID

    });
  }

  ngOnInit(): void {
    this.getBranches();
  }

  getBranches(): void {
    this.dashboardService.getAllBranches().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.branches = response.data; // Extract branches from response
        }
      },
      (error) => {
        console.error('Error fetching branches:', error);
      }
    );
  }
  onSubmit(): void {
    if (this.newItem.valid) {
      this.dashboardService.createItem(this.newItem.value).pipe().subscribe(
        res =>{
          alert(res.message);
          this.newItem.reset();

        },
        err=>{
          console.log(err);
        }
      );
    
    } else {
      console.log('Form is invalid!');
    }
  }


  // Edit an existing item (called when clicking "Edit" button)
  editItem(item: any): void {
    this.isEditMode = true;           // Switch to edit mode
    this.editingItemId = item.id;     // Store the editing item ID
    this.newItem.patchValue(item);    // Populate form with item data
  }

  // Update an item
  updateItem(): void {
    if (this.newItem.valid && this.editingItemId !== null) {
      this.dashboardService.updateItems(this.editingItemId, this.newItem.value).subscribe(
        () => {
          alert('Item updated successfully!');
          this.newItem.reset();
          this.isEditMode = false;
          this.editingItemId = null; // Reset edit mode
        },
        (err) => {
          console.error('Error updating item:', err);
          alert('Failed to update item.');
        }
      );
    }
  }

  // Cancel edit mode and reset the form
  cancelEdit(): void {
    this.isEditMode = false;
    this.editingItemId = null;
    this.newItem.reset();
  }
}


