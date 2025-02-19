import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.sass']
})
export class BranchComponent implements OnInit {

  newBranch: FormGroup;

  constructor(private fb: FormBuilder,private dashboardService:DashboardService) { 
    // Initialize the form group with controls
    this.newBranch = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      location: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
  onCrtBranch(): void {
    if (this.newBranch.valid) {
      this.dashboardService.createBranch(this.newBranch.value).pipe().subscribe(
        res => {
          alert(res.message);  // Display success message
        },
        err => {
          console.error('Error creating branch:', err);  // Log detailed error
          alert('An error occurred while creating the branch. Please try again.');
        }
      );
    } else {
      console.log('Form is invalid!');
      alert('Please fill out the form correctly.');
    }
  }
}
