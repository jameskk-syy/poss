import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.sass']
})
export class TransactionComponent implements OnInit {
  saleForm: FormGroup;
  branches: any[] = [];
  products: any[] = []; // Renamed items to products for clarity
  selectedProducts: any[] = [];
  showProductTable: boolean = false;

  constructor(private fb: FormBuilder, private dashboardService: DashboardService) {
    this.saleForm = this.fb.group({
      customerName: '',
      branchId: ['', Validators.required],
      saleOrderLines: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.getBranches();
    this.fetchProducts();
  }

  get saleOrderLines(): FormArray {
    return this.saleForm.get('saleOrderLines') as FormArray;
  }

  getBranches(): void {
    this.dashboardService.getAllBranches().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.branches = response.data;
        }
      },
      (error) => console.error('Error fetching branches:', error)
    );
  }

  fetchProducts(): void {
    this.dashboardService.getAllProducts().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.products = response.data; // Assign to products array
          this.showProductTable = true;
        }
      },
      (error) => console.error('Error fetching products:', error)
    );
  }

  onProductSelect(event: any): void {
    const selectedProduct = event.value;
    if (selectedProduct) {
      this.selectedProducts.push({
        id: selectedProduct.id,
        name: selectedProduct.name,
        branch: selectedProduct.branch ? selectedProduct.branch.name : '',
        price: selectedProduct.price ? selectedProduct.price : 0,
        quantity: 1,
        subTotal: selectedProduct.price
      });

      // Add to reactive form
      const productGroup = this.fb.group({
        itemId: [selectedProduct.id, Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
        price: [selectedProduct.price, Validators.required],
        subTotal: [selectedProduct.price, Validators.required]
      });

      this.saleOrderLines.push(productGroup);
    }
  }

  updateSubtotal(index: number): void {
    const product = this.selectedProducts[index];
    product.subTotal = product.price * product.quantity;

    // Update in FormArray
    const control = this.saleOrderLines.at(index);
    control.patchValue({ subTotal: product.subTotal });
  }

  removeProduct(index: number): void {
    this.selectedProducts.splice(index, 1);
    this.saleOrderLines.removeAt(index);
  }

  submitSale(): void {
    if (this.saleForm.valid) {
      this.dashboardService.createSale(this.saleForm.value).subscribe(
        () => {
          alert('Sale successfully created!');
          this.saleForm.reset();
          this.saleOrderLines.clear();
          this.selectedProducts = [];
        },
        (err) => {
          console.error('Error processing sale:', err);
          alert('Failed to create sale.');
        }
      );
    }
  }
}
