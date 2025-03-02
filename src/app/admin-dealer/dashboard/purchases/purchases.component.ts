import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.sass']
})
export class PurchasesComponent  implements OnInit {
  purchaseForm: FormGroup;
  itemspr: any[] = []; // Store fetched products (Search Results)
  selectedProducts: any[] = []; // Store selected products
  selectedProductsDataSource = new MatTableDataSource<any>([]);
  showProductTable: boolean = false; // Controls visibility of product search table
  
  @ViewChild('selectedProductsPaginator') selectedProductsPaginator: MatPaginator;

  constructor(
    private fb: FormBuilder, 
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {
    this.purchaseForm = this.fb.group({
      // customerName: '',
      items: this.fb.array([]), // FormArray for selected products
      totalAmount: [{ value: 0, disabled: true }, Validators.required],
      totalAmountPost: [{ value: 0, disabled: true }, Validators.required]
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (this.selectedProductsPaginator) {
      this.selectedProductsDataSource.paginator = this.selectedProductsPaginator;
    }
  }

  get items(): FormArray {
    return this.purchaseForm.get('items') as FormArray;
  }

  // Fetch products when the search icon is clicked and show the table
  fetchProducts(): void {
    this.dashboardService.getAllProducts().subscribe(
      (response: any) => {
        console.log('Fetched Products:', response);
        if (Array.isArray(response) && response.length > 0) {
          this.itemspr = response;
          this.showProductTable = true; // Show the product search table
        } else {
          console.warn('No products found.');
          alert('No products found.');
        }
      },
      (error) => console.error('Error fetching products:', error)
    );
  }

  // Allow toggling of product selection
  toggleProductSelection(item: any, isChecked: boolean): void {
    console.log(`Toggle selection for item ${item.id}, checked: ${isChecked}`);
    if (isChecked) {
      this.selectProduct(item); // Select the product if checked
    } else {
      this.removeProductById(item.id); // Remove the product if unchecked
    }
  }

  // Remove product by ID
  removeProductById(productId: number): void {
    const index = this.selectedProducts.findIndex(product => product.id === productId);
    if (index !== -1) {
      this.selectedProducts.splice(index, 1);
      this.items.removeAt(index); // Also remove from FormArray
      this.refreshSelectedProductsTable();
    }
  }

  selectProduct(selectedProduct: any): void {
    console.log('Selecting product:', selectedProduct);
    // Prevent duplicates
    if (!this.selectedProducts.some(product => product.id === selectedProduct.id)) {
      const productData = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        branch: selectedProduct.branch ? selectedProduct.branch.name : 'N/A',
        branchId: selectedProduct.branch ? selectedProduct.branch.id : 0,
        supplier: selectedProduct.supplier ? selectedProduct.supplier.supplierName : 0,
        supplierId: selectedProduct.supplier ? selectedProduct.supplier.id : 0,
        regularBuyingPrice: selectedProduct.regularBuyingPrice,
        quantity: 1,
        subTotal: selectedProduct.regularBuyingPrice
      };

      this.selectedProducts.push(productData);

      // Add product to FormArray
      const productGroup = this.fb.group({
        itemId: [selectedProduct.id, Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
        regularBuyingPrice: [selectedProduct.regularBuyingPrice, Validators.required],
        subTotal: [selectedProduct.regularBuyingPrice, Validators.required]
      });

      // Watch for quantity changes and update subtotal
      productGroup.get('quantity')?.valueChanges.subscribe(newQuantity => {
        this.updateSubtotal(selectedProduct.id, newQuantity);
      });

      this.items.push(productGroup);
      
      // Refresh the display of selected products in the table
      this.refreshSelectedProductsTable();
      this.updateTotalAmount();
    }
  }

  // Method to refresh the display of selected products
  refreshSelectedProductsTable(): void {
    console.log('Refreshing selected products table:', this.selectedProducts);
    // Create a new MatTableDataSource with a new array reference to trigger change detection
    this.selectedProductsDataSource = new MatTableDataSource([...this.selectedProducts]);
    if (this.selectedProductsPaginator) {
      this.selectedProductsDataSource.paginator = this.selectedProductsPaginator;
    }
    this.cdr.detectChanges();
  }

  // Update subtotal when quantity changes
  updateSubtotal(productId: number, newQuantity: number): void {
    if (newQuantity && newQuantity > 0) {
      const product = this.selectedProducts.find(p => p.id === productId);
      if (product) {
        product.quantity = newQuantity;
        product.subTotal = product.regularBuyingPrice * newQuantity;

        // Update FormArray value
        const index = this.selectedProducts.findIndex(p => p.id === productId);
        if (index !== -1) {
          this.items.at(index).patchValue({
            quantity: newQuantity,
            subTotal: product.subTotal
          });

          this.purchaseForm.markAsDirty();
        }
      }
    }
  }

  // Update total amount
  updateTotalAmount(): void {
    const totalAmount = this.selectedProducts.reduce((sum, product) => sum + product.subTotal, 0);
    this.purchaseForm.patchValue({
      totalAmount: totalAmount,
      totalAmountPost: totalAmount
    });
  }


  removeProduct(index: number, event: Event): void {
    event.stopPropagation(); 
    event.preventDefault(); 

    this.selectedProducts.splice(index, 1);
    this.items.removeAt(index);
    this.refreshSelectedProductsTable();
    this.updateTotalAmount();
  }

  // submitpurchase(): void {
  //   if (this.purchaseForm.valid && this.selectedProducts.length > 0) {
  //     const newprData = {
  //       customerName: this.purchaseForm.value.customerName || null,
  //       branchId: Number(this.selectedProducts.find(p => p.branchId)?.branchId) || 0, 
  //       items: this.selectedProducts.map(product => ({
  //         itemId: product.id, 
  //         quantity: Number(product.quantity), 
  //         price: Number(product.price), 
  //         subTotal: Number(product.subTotal) 
  //       }))
  //     };

  //     console.log('Submitting purchase:', JSON.stringify(newprData, null, 2));

  //     this.dashboardService.createpurchase(newprData).subscribe(
  //       () => {
  //         alert('purchase successfully created!');
  //         this.purchaseForm.reset();
  //         this.items.clear();
  //         this.selectedProducts = [];
  //         this.refreshSelectedProductsTable();
  //       },
  //       (err) => {
  //         console.error('Error processing purchase:', err);
  //         alert('Failed to create purchase.');
  //       }
  //     );
  //   } else {
  //     // Keep the product search table visible
  //     this.showProductTable = true;
  //   }
  // }

  // submitProduct(): void {
  //   if (this.purchaseForm.valid && this.selectedProducts.length > 0) {
  //     const newprData = {
  //       // customerName: this.purchaseForm.value.customerName || null,
  //       branchId: Number(this.selectedProducts.find(p => p.branchId)?.branchId) || 0,
  //       items: this.selectedProducts.map(product => ({
  //         itemId: product.id,
  //         subTotal: Number(product.subTotal),

  //         quantity: Number(product.quantity),
  //         price: Number(product.price),
  //       }))
  //     };
  
  //     console.log('Submitting purchase:', JSON.stringify(newprData, null, 2));
  
  //     this.dashboardService.createPrc(newprData).subscribe(
  //       () => {
  //         alert('purchase successfully created!');
  //         this.showProductTable = false; 
  
  //         // Reset the form and selected products
  //         this.purchaseForm.reset();
  //         this.items.clear();
  //         this.selectedProducts = [];
  //         this.refreshSelectedProductsTable();
  //       },
  //       (err) => {
  //         console.error('Error processing purchase:', err);
  //         alert('Failed to create purchase.');
  //       }
  //     );
  //   } else {
  //     // Keep the product search table visible if the form is invalid
  //     this.showProductTable = true;
  //   }
  // }

  submitProduct(): void {
    if (this.purchaseForm.valid && this.selectedProducts.length > 0) {
      const supplierId = this.selectedProducts.length > 0 ? this.selectedProducts[0].supplierId : 0;
  
      const newprData = {
        branchId: Number(this.selectedProducts.find(p => p.branchId)?.branchId) || 0,
        items: this.selectedProducts.map(product => ({
          itemId: product.id,
          subTotal: Number(product.subTotal),
          quantity: Number(product.quantity),
          price: Number(product.price),
        })),
        totalAmount: this.purchaseForm.value.totalAmount,
        supplierId: supplierId // Include supplierId in the request body
      };
  
      console.log('Submitting purchase:', JSON.stringify(newprData, null, 2));
  
      this.dashboardService.createPrc(newprData).subscribe(
        () => {
          alert('purchase successfully created!');
          this.showProductTable = false;
  
          // Reset the form and selected products
          this.purchaseForm.reset();
          this.items.clear();
          this.selectedProducts = [];
          this.refreshSelectedProductsTable();
        },
        (err) => {
          console.error('Error processing purchase:', err);
          alert('Failed to create purchase.');
        }
      );
    } else {
      // Keep the product search table visible if the form is invalid
      this.showProductTable = true;
    }
  }
  
}