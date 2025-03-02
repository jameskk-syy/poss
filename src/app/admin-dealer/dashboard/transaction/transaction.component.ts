import { Component, OnInit, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.sass']
})
export class TransactionComponent implements OnInit {
  saleForm: FormGroup;
  items: any[] = []; 
  selectedProducts: any[] = []; 
  selectedProductsDataSource = new MatTableDataSource<any>([]);
  showProductTable: boolean = false; 
  totalAmountInWords: string = '';

  @ViewChild('selectedProductsPaginator') selectedProductsPaginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {
    this.saleForm = this.fb.group({
      customerName: '',
      saleOrderLines: this.fb.array([]),
      totalAmount: [{ value: 0, disabled: true }, Validators.required] 
    });
  }

  ngOnInit(): void {
    this.saleForm.get('totalAmount')?.valueChanges.subscribe((value) => {
      this.totalAmountInWords = this.convertNumberToWords(value) + '';
    });
  }

  ngAfterViewInit() {
    if (this.selectedProductsPaginator) {
      this.selectedProductsDataSource.paginator = this.selectedProductsPaginator;
    }
  }

  get saleOrderLines(): FormArray {
    return this.saleForm.get('saleOrderLines') as FormArray;
  }

  fetchProducts(event: Event): void {
    event.preventDefault(); 
    event.stopPropagation(); 
    this.dashboardService.getAllProducts().subscribe(
      (response: any) => {
        console.log('Fetched Products:', response);
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

  
  toggleProductSelection(item: any, isChecked: boolean): void {
    console.log(`Toggle selection for item ${item.id}, checked: ${isChecked}`);
    if (isChecked) {
      this.selectProduct(item); 
    } else {
      this.removeProductById(item.id); 
    }
  }

  // Remove product by ID
  removeProductById(productId: number): void {
    const index = this.selectedProducts.findIndex(product => product.id === productId);
    if (index !== -1) {
      this.selectedProducts.splice(index, 1);
      this.saleOrderLines.removeAt(index); // Also remove from FormArray
      this.refreshSelectedProductsTable();
      this.updateTotalAmount(); // Update total amount
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
        sellingPrice: selectedProduct.sellingPrice,
        quantity: 1,
        subTotal: selectedProduct.sellingPrice
      };

      this.selectedProducts.push(productData);

      // Add product to FormArray
      const productGroup = this.fb.group({
        itemId: [selectedProduct.id, Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
        sellingPrice: [selectedProduct.sellingPrice, Validators.required],
        subTotal: [selectedProduct.sellingPrice, Validators.required]
      });

      productGroup.get('quantity')?.valueChanges.subscribe(newQuantity => {
        this.updateSubtotal(selectedProduct.id, newQuantity);
      });

      this.saleOrderLines.push(productGroup);
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

  updateTotalAmount(): void {
    const totalAmount = this.selectedProducts.reduce((sum, product) => sum + product.subTotal, 0);
    this.saleForm.patchValue({
      totalAmount: totalAmount
    });
  }

  // Update subtotal when quantity changes
  updateSubtotal(productId: number, newQuantity: number): void {
    if (newQuantity && newQuantity > 0) {
      const product = this.selectedProducts.find(p => p.id === productId);
      if (product) {
        product.quantity = newQuantity;
        product.subTotal = product.sellingPrice * newQuantity;

        // Update FormArray value
        const index = this.selectedProducts.findIndex(p => p.id === productId);
        if (index !== -1) {
          this.saleOrderLines.at(index).patchValue({
            quantity: newQuantity,
            subTotal: product.subTotal
          });

          this.saleForm.markAsDirty();
          this.updateTotalAmount(); // Update total amount
        }
      }
    }
  }

  removeProduct(index: number, event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.selectedProducts.splice(index, 1);
    this.saleOrderLines.removeAt(index);
    this.refreshSelectedProductsTable();
    this.updateTotalAmount(); 
  }

  // submitSale(): void {
  //   if (this.saleForm.valid && this.selectedProducts.length > 0) {
  //     const saleData = {
  //       customerName: this.saleForm.value.customerName || null,
  //       branchId: Number(this.selectedProducts.find(p => p.branchId)?.branchId) || 0,
  //       saleOrderLines: this.selectedProducts.map(product => ({
  //         itemId: product.id,
  //         quantity: Number(product.quantity),
  //         price: Number(product.sellingPrice),
  //         subTotal: Number(product.subTotal)
  //       })),
  //       totalAmount: this.saleForm.value.totalAmount
  //     };

  //     console.log('Submitting sale:', JSON.stringify(saleData, null, 2));

  //     this.dashboardService.createSale(saleData).subscribe(
  //       () => {
  //         alert('Sale successfully created!');
  //         this.showProductTable = false;

  //         // Reset the form and selected products
  //         this.saleForm.reset();
  //         this.saleOrderLines.clear();
  //         this.selectedProducts = [];
  //         this.refreshSelectedProductsTable();
  //       },
  //       (err) => {
  //         console.error('Error processing sale:', err);
  //         alert('Failed to create sale.');
  //       }
  //     );
  //   } else {
  //     // Keep the product search table visible if the form is invalid
  //     this.showProductTable = true;
  //   }
  // }
  submitSale(): void {
    if (this.saleForm.valid && this.selectedProducts.length > 0) {
      const saleData = {
        customerName: this.saleForm.value.customerName || null,
        totalAmount: this.saleForm.value.totalAmount, // Include totalAmount in the payload
        branchId: Number(this.selectedProducts.find(p => p.branchId)?.branchId) || 0,
        saleOrderLines: this.selectedProducts.map(product => ({
          item_id: product.id, // Adjust field name if necessary
          quantity: Number(product.quantity),
          price: Number(product.sellingPrice),
          sub_total: Number(product.subTotal) // Adjust field name if necessary
        })),
      };
  
      console.log('Sending sale transaction data to API:', JSON.stringify(saleData, null, 2));
  
      this.dashboardService.createSale(saleData).subscribe(
        () => {
          alert('Sale successfully created!');
          this.showProductTable = false;
  
          // Reset the form and selected products
          this.saleForm.reset();
          this.saleOrderLines.clear();
          this.selectedProducts = [];
          this.refreshSelectedProductsTable();
        },
        (err) => {
          console.error('Error processing sale:', err);
          alert('Failed to create sale.');
        }
      );
    } else {
      // Keep the product search table visible if the form is invalid
      this.showProductTable = true;
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    const tableElement = document.querySelector('.content-block');
    if (tableElement && !tableElement.contains(event.target as Node)) {
      this.showProductTable = false;
    }
  }
  convertNumberToWords(num: number): string {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const thousands = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
  
    if (num === 0) {
      return 'Zero Kenya Shillings';
    }
  
    let word = '';
    if (num < 0) {
      word = 'Negative ';
      num = Math.abs(num);
    }
  
    let numStr = num.toString();
    let chunkCount = 0;
  
    while (num > 0) {
      let chunk = num % 1000;
      if (chunk !== 0) {
        let chunkWords = this.convertChunk(chunk, ones, teens, tens);
        word = chunkWords + (thousands[chunkCount] ? ' ' + thousands[chunkCount] : '') + ' ' + word;
      }
      num = Math.floor(num / 1000);
      chunkCount++;
    }
  
    return word.trim() + ' Kenya Shillings';
  }
  
  private convertChunk(num: number, ones: string[], teens: string[], tens: string[]): string {
    let words = '';
  
    if (num >= 100) {
      words += ones[Math.floor(num / 100)] + ' Hundred ';
      num %= 100;
    }
  
    if (num >= 20) {
      words += tens[Math.floor(num / 10)] + ' ';
      num %= 10;
    }
  
    if (num >= 10) {
      words += teens[num - 10] + ' ';
    } else if (num > 0) {
      words += ones[num] + ' ';
    }
  
    return words.trim();
  }
  
  
}
  
