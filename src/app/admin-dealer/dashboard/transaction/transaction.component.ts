import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  HostListener,
  AfterViewInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/data/services/notification.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.sass'],
})
export class TransactionComponent implements OnInit, AfterViewInit {
  saleForm: FormGroup;
  items: any[] = [];
  itemsDataSource = new MatTableDataSource<any>([]);
  selectedProducts: any[] = [];
  selectedProductsDataSource = new MatTableDataSource<any>([]);
  showProductTable: boolean = false;
  totalAmountInWords: string = '';
  isCreditSale: boolean = false;
  balance: string = '0';
  searchControl = new FormControl('');

  isLoading = false;

  customers: any[] = []; // Store customer list
  filteredCustomers: Observable<any[]>; // Observable for filtering
  customerNameControl = new FormControl(''); // Control for autocomplete

  @ViewChild('selectedProductsPaginator')
  selectedProductsPaginator: MatPaginator;
  @ViewChild('productsPaginator') productsPaginator: MatPaginator;
  userForm!: FormGroup;
  roles: string[] = ['ADMIN', 'CASHIER', 'STOREKEEPER'];
  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef,
    private dialog:MatDialog,
    private notificationApi:NotificationService
  ) {
   
  }
  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.dashboardService.addUser(this.userForm.value).pipe().subscribe(
        res => {
          this.notificationApi.alertSuccess("user added successfully"); // Log response
          alert(res.message);
          this.userForm.reset();
          // this.getProducts();
          // this.isFormOpen = false;
        },
        err => {
          console.error('Error adding item:', err); // Log full error
          if (err.error) {
            console.error("Backend Error Message:", err.error);
          }
        }
      );
      
    }
  }

  ngAfterViewInit() {
    // The paginators will be initialized here, but we'll also ensure they're attached
    // after data is loaded in the fetchProducts method
    if (this.selectedProductsPaginator) {
      this.selectedProductsDataSource.paginator =
        this.selectedProductsPaginator;
    }

    // Initialize paginator for the products table
    if (this.productsPaginator) {
      this.itemsDataSource.paginator = this.productsPaginator;
      this.cdr.detectChanges();
    }
  }

  filterCustomers(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.customers.filter((customer) =>
      customer.customerName.toLowerCase().includes(filterValue)
    );
    console.log('Filtered Customers:', this.customers);
  }

  onCustomerSelected(event: any): void {
    this.saleForm.patchValue({ customerName: event.option.value });
  }

  applyFilter(filterValue: string) {
    if (!filterValue) {
      this.itemsDataSource.filter = '';
      return;
    }

    filterValue = filterValue.trim().toLowerCase();
    this.itemsDataSource.filter = filterValue;

    // Reset to first page when filtering
    if (this.itemsDataSource.paginator) {
      this.itemsDataSource.paginator.firstPage();
    }
  }

  get saleOrderLines(): FormArray {
    return this.saleForm.get('saleOrderLines') as FormArray;
  }

  fetchProducts(event: Event): void {
    this.isLoading = true;

    event.preventDefault();
    event.stopPropagation();
    this.dashboardService.getAllProducts().subscribe(
      (response: any) => {
        console.log('Fetched Products:', response);
        if (Array.isArray(response) && response.length > 0) {
          this.items = response;

          // Create a MatTableDataSource with products
          this.itemsDataSource = new MatTableDataSource<any>(this.items);

          // Setup custom filter predicate for searching across all fields
          this.itemsDataSource.filterPredicate = (
            data: any,
            filter: string
          ) => {
            const searchTerms = filter.toLowerCase().split(' ');
            const dataStr =
              data.id +
              ' ' +
              data.name.toLowerCase() +
              ' ' +
              (data.branch?.name ? data.branch.name.toLowerCase() : 'n/a') +
              ' ' +
              (data.sellingPrice || 'n/a');

            return searchTerms.every((term) => dataStr.includes(term));
          };

          // Connect the paginator
          if (this.productsPaginator) {
            this.itemsDataSource.paginator = this.productsPaginator;
          }

          this.showProductTable = true;
          this.isLoading = false;

          // Use setTimeout to ensure the view is updated before attempting to set the paginator
          setTimeout(() => {
            // Connect the paginator after the data is loaded and view is updated
            if (this.productsPaginator) {
              this.itemsDataSource.paginator = this.productsPaginator;
              console.log('Paginator attached to products table');
            } else {
              console.warn('Products paginator not found');
            }
            this.cdr.detectChanges();
          });
        } else {
          console.warn('No products found.');
          alert('No products found.');
        }
      },
      (error) => console.error('Error fetching products:', error)
    );
  }

  toggleProductSelection(item: any, isChecked: boolean): void {
    if (isChecked) {
      this.selectProduct(item);
    } else {
      this.removeProductById(item.id);
    }
  }

  removeProductById(productId: number): void {
    const index = this.selectedProducts.findIndex(
      (product) => product.id === productId
    );
    if (index !== -1) {
      this.selectedProducts.splice(index, 1);
      this.saleOrderLines.removeAt(index);
      this.refreshSelectedProductsTable();
      this.updateTotalAmount(); // Update total amount
    }
  }

  selectProduct(selectedProduct: any): void {
    if (
      !this.selectedProducts.some(
        (product) => product.id === selectedProduct.id
      )
    ) {
      const productData = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        branch: selectedProduct.branch ? selectedProduct.branch.name : 'N/A',
        branchId: selectedProduct.branch ? selectedProduct.branch.id : 0,
        sellingPrice: selectedProduct.sellingPrice,
        quantity: 1,
        subTotal: selectedProduct.sellingPrice,
      };

      this.selectedProducts.push(productData);

      // Add product to FormArray
      const productGroup = this.fb.group({
        itemId: [selectedProduct.id, Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
        sellingPrice: [selectedProduct.sellingPrice, Validators.required],
        subTotal: [selectedProduct.sellingPrice, Validators.required],
      });

      productGroup.get('quantity')?.valueChanges.subscribe((newQuantity) => {
        this.updateSubtotal(selectedProduct.id, newQuantity);
      });

      this.saleOrderLines.push(productGroup);
      this.refreshSelectedProductsTable();
      this.updateTotalAmount();
    }
  }

  refreshSelectedProductsTable(): void {
    this.selectedProductsDataSource = new MatTableDataSource([
      ...this.selectedProducts,
    ]);

    // Ensure paginator is attached whenever the selected products table is refreshed
    setTimeout(() => {
      if (this.selectedProductsPaginator) {
        this.selectedProductsDataSource.paginator =
          this.selectedProductsPaginator;
      }
      this.cdr.detectChanges();
    });
  }

  updateTotalAmount(): void {
    const totalAmount = this.selectedProducts.reduce(
      (sum, product) => sum + product.subTotal,
      0
    );
    this.saleForm.patchValue({
      totalAmount: totalAmount,
    });
  }

  updateSubtotal(productId: number, newQuantity: number): void {
    if (newQuantity && newQuantity > 0) {
      const product = this.selectedProducts.find((p) => p.id === productId);
      if (product) {
        product.quantity = newQuantity;
        product.subTotal = product.sellingPrice * newQuantity;

        // Update FormArray value
        const index = this.selectedProducts.findIndex(
          (p) => p.id === productId
        );
        if (index !== -1) {
          this.saleOrderLines.at(index).patchValue({
            quantity: newQuantity,
            subTotal: product.subTotal,
          });

          this.saleForm.markAsDirty();
          this.updateTotalAmount();
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

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    const tableElement = document.querySelector('.content-block');
    if (tableElement && !tableElement.contains(event.target as Node)) {
      this.showProductTable = false;
    }
  }

  toggleSaleMode(): void {
    this.isCreditSale = !this.isCreditSale;
    if (this.isCreditSale) {
      this.saleForm.get('amountPaid')?.disable
    } else {
      this.saleForm.get('amountPaid')?.disable();
    }
  }
  
  openPaymentDialog(amount:any): void {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '350px',
      data: {amount}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Payment Confirmed:', result);
        // Handle payment submission to API here
      }
    })}

  calculateBalance(): void {
    const totalAmount = this.saleForm.get('totalAmount')?.value || 0;
    const amountPaid = this.saleForm.get('amountPaid')?.value || 0;
    const balanceValue = totalAmount - amountPaid;
    this.balance =
      balanceValue >= 0 ? `-${balanceValue}` : `${Math.abs(balanceValue)}`;
  }

  convertNumberToWords(num: number): string {
    const ones = [
      '',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
    ];
    const teens = [
      'Ten',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen',
    ];
    const tens = [
      '',
      '',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ];
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
        word =
          chunkWords +
          (thousands[chunkCount] ? ' ' + thousands[chunkCount] : '') +
          ' ' +
          word;
      }
      num = Math.floor(num / 1000);
      chunkCount++;
    }

    return word.trim() + ' Kenya Shillings';
  }

  private convertChunk(
    num: number,
    ones: string[],
    teens: string[],
    tens: string[]
  ): string {
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

  submitSale(): void {
    if (this.saleForm.valid && this.selectedProducts.length > 0) {
      const saleData = {
        customerName: this.saleForm.value.customerName || null,
        totalAmount: Number(this.saleForm.get('totalAmount')?.value) || 0,
        branchId:
          Number(this.selectedProducts.find((p) => p.branchId)?.branchId) || 0,
        saleOrderLines: this.selectedProducts.map((product) => ({
          itemId: product.id, 
          quantity: Number(product.quantity),
          price: Number(product.sellingPrice),
          subTotal: Number(product.subTotal),
        })),
        saleType: this.isCreditSale ? 'CREDIT' : 'NORMAL', 
        customerId: this.saleForm.value.customerId,
        ...(this.isCreditSale && { amountPaid: this.saleForm.value.amountPaid }),
      };
  
      console.log(
        'Sending sale transaction data to API:',
        JSON.stringify(saleData, null, 2)
      );
    if(!this.isCreditSale){
      this.dashboardService.createSale(saleData).subscribe(
        () => {
          alert('Sale successfully created!');
          this.showProductTable = false;
  
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
    }{
      this.openPaymentDialog(saleData?.totalAmount);
    }
    } else {
      this.showProductTable = true;
    }
  }
  
}
