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

  constructor(private fb: FormBuilder,private dashboardService:DashboardService) { 
    // Initialize the form group with controls
    this.newItem = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required]],
      count: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // Only numbers for quantity
    });
  }

  ngOnInit(): void {
  }
  onSubmit(): void {
    if (this.newItem.valid) {
      this.dashboardService.createItem(this.newItem.value).pipe().subscribe(
        res =>{
          alert(res.message)
        },err=>{
          console.log(err);
        }
      );
    
    } else {
      console.log('Form is invalid!');
    }
  }
}
