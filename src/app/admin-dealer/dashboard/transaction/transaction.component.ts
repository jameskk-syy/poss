import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.sass']
})
export class TransactionComponent implements OnInit {saleForm: FormGroup;
  branches: any[] = [];
  items: any[] = [];

  constructor(private fb: FormBuilder, private dashboardService: DashboardService) {
    this.saleForm = this.fb.group({
      customerName: ['', Validators.required],
      branchId: ['', Validators.required],
      saleOrderLines: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.getBranches();
    this.getItems();
    this.addProduct(); // Initialize with one product
  }

  get saleOrderLines(): FormArray {
    return this.saleForm.get('saleOrderLines') as FormArray;
  }

  addProduct(): void {
    const productGroup = this.fb.group({
      itemId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: ['', Validators.required]
    });
    this.saleOrderLines.push(productGroup);
  }

  removeProduct(index: number): void {
    this.saleOrderLines.removeAt(index);
  }

  getBranches(): void {
    this.dashboardService.getAllBranches().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.branches = response.data;
        }
      },
      (error) => {
        console.error('Error fetching branches:', error);
      }
    );
  }

  getItems(): void {
    this.dashboardService.getAllProducts().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.items = response.data;
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  submitSale(): void {
    if (this.saleForm.valid) {
      this.dashboardService.createSale(this.saleForm.value).subscribe(
        (res) => {
          alert('Sale successfully created!');
          this.saleForm.reset();
          this.saleOrderLines.clear();
          this.addProduct();
        },
        (err) => {
          console.error('Error processing sale:', err);
          alert('Failed to create sale.');
        }
      );
    }
  }
}
