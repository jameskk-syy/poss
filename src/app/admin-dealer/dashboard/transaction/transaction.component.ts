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
  items: any[] = []; // Store fetched products (Search Results)
  selectedProducts: any[] = []; // Store selected products
  showProductTable: boolean = false; // Show available products table

  constructor(private fb: FormBuilder, private dashboardService: DashboardService) {
    this.saleForm = this.fb.group({
      customerName: '',
      saleOrderLines: this.fb.array([]) // FormArray for selected products
    });
  }

  ngOnInit(): void {}

  get saleOrderLines(): FormArray {
    return this.saleForm.get('saleOrderLines') as FormArray;
  }

  // ✅ Fetch products when the search icon is clicked
  fetchProducts(): void {
    this.dashboardService.getAllProducts().subscribe(
      (response: any) => {
        console.log('Fetched Products:', response); // Debugging API Response

        if (Array.isArray(response) && response.length > 0) {
          this.items = response;
          this.showProductTable = true;
        } else {
          console.warn('No products found.');
          alert('No products found.');
        }
      },
      (error) => console.error('Error fetching products:', error)
    );
  }

  // ✅ Select a product from the search table
  selectProduct(selectedProduct: any): void {
    if (!this.selectedProducts.some(product => product.id === selectedProduct.id)) {
      const productData = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        branch: selectedProduct.branch ? selectedProduct.branch.name : 'N/A',
        branchId: selectedProduct.branch ? selectedProduct.branch.id : 0, // Ensure branch ID is available
        price: selectedProduct.price,
        quantity: 1, // Default quantity = 1
        subTotal: selectedProduct.price // Initial subtotal = price * 1
      };

      this.selectedProducts.push(productData);

      // ✅ Add to FormArray (Ensure `itemId` is set for backend)
      const productGroup = this.fb.group({
        itemId: [selectedProduct.id, Validators.required], // Ensure `itemId` is included
        quantity: [1, [Validators.required, Validators.min(1)]], // Default quantity = 1
        price: [selectedProduct.price, Validators.required],
        subTotal: [selectedProduct.price, Validators.required]
      });

      // ✅ Watch for quantity changes and update subtotal dynamically
      productGroup.get('quantity')?.valueChanges.subscribe(newQuantity => {
        this.updateSubtotal(selectedProduct.id, newQuantity);
      });

      this.saleOrderLines.push(productGroup);
    }
  }

  // ✅ Update subtotal when quantity changes
  updateSubtotal(productId: number, newQuantity: number): void {
    if (newQuantity && newQuantity > 0) {
      const product = this.selectedProducts.find(p => p.id === productId);
      if (product) {
        product.quantity = newQuantity;
        product.subTotal = product.price * newQuantity;

        // Find index in selectedProducts to update FormArray
        const index = this.selectedProducts.indexOf(product);
        if (index !== -1) {
          this.saleOrderLines.at(index).patchValue({ 
            quantity: newQuantity, 
            subTotal: product.subTotal 
          });

          // ✅ Force UI update (Fix UI not updating issue)
          this.saleForm.updateValueAndValidity();
        }
      }
    }
  }

  // ✅ Remove a selected product
  removeProduct(index: number): void {
    this.selectedProducts.splice(index, 1);
    this.saleOrderLines.removeAt(index);
  }

  // ✅ Submit the form
  submitSale(): void {
    if (this.saleForm.valid && this.selectedProducts.length > 0) {
      const saleData = {
        customerName: this.saleForm.value.customerName || null, // ✅ Use null instead of empty string
        branchId: this.selectedProducts.find(p => p.branchId)?.branchId || 1, // ✅ Ensure branchId is valid
        saleOrderLines: this.selectedProducts.map(product => ({
          itemId: product.id,
          quantity: Number(product.quantity), // ✅ Ensure quantity is a number
          price: product.price,
          subTotal: product.subTotal // ✅ Use 'subTotal' (Uppercase 'T')
        }))
      };
  
      console.log('Submitting sale:', JSON.stringify(saleData, null, 2));
  
      // this.dashboardService.createSale(saleData).subscribe(
      //   () => {
      //     alert('Sale successfully created!');
      //     this.saleForm.reset();
      //     this.saleOrderLines.clear();
      //     this.selectedProducts = [];
      //   },
      //   (err) => {
      //     console.error('Error processing sale:', err);
      //     alert('Failed to create sale.');
      //   }
      // );

      this.dashboardService.createSale(saleData).subscribe(
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
      
    } else {
      alert('Please add at least one product before submitting.');
    }
  }
  
}
