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


@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.sass'],
})
export class PurchasesComponent implements OnInit, AfterViewInit {
  productForm: FormGroup;
  itemspr: any[] = [];
  itemsprDataSource = new MatTableDataSource<any>([]);
  selectedProducts: any[] = [];
  selectedProductsDataSource = new MatTableDataSource<any>([]);
  showProductTable: boolean = false;
  totalAmountInWords: string = '';
  isCreditSale: boolean = false;
  balance: string = '0';
  searchControl = new FormControl('');

  suppliers: any[] = []; // Store supplier list
  filteredSuppliers: Observable<any[]>; // Observable for filtering
  supplierNameControl = new FormControl(''); // Control for autocomplete

  @ViewChild('selectedProductsPaginator')
  selectedProductsPaginator: MatPaginator;
  @ViewChild('productsPaginator') productsPaginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {
    this.productForm = this.fb.group({
      // supplierName: '',
      items: this.fb.array([]),
      totalAmount: [{ value: 0, disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    this.productForm.get('totalAmount')?.valueChanges.subscribe((value) => {
      this.totalAmountInWords = this.convertNumberToWords(value) + '';
    });

    // this.productForm.get('amountPaid')?.valueChanges.subscribe(() => {
    //   this.calculateBalance();
    // });

    // Setup search filtering
    this.searchControl.valueChanges.subscribe((searchTerm) => {
      this.applyFilter(searchTerm);
    });

    // Fetch suppliers
    this.dashboardService.getAllSuppliers().subscribe((response: any) => {
      this.suppliers = response;
      console.log('Fetched suppliers:', this.suppliers);
      this.filteredSuppliers = this.supplierNameControl.valueChanges.pipe(
        startWith(''),
        map((value) => this.filterSuppliers(value || ''))
      );
    });
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
      this.itemsprDataSource.paginator = this.productsPaginator;
      this.cdr.detectChanges();
    }
  }

  filterSuppliers(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.suppliers.filter((supplier) =>
      supplier.supplierName.toLowerCase().includes(filterValue)
    );
    console.log('Filtered suppliers:', this.suppliers);
  }

  onSupplierselected(event: any): void {
    this.productForm.patchValue({ supplierName: event.option.value });
  }

  applyFilter(filterValue: string) {
    if (!filterValue) {
      this.itemsprDataSource.filter = '';
      return;
    }

    filterValue = filterValue.trim().toLowerCase();
    this.itemsprDataSource.filter = filterValue;

    // Reset to first page when filtering
    if (this.itemsprDataSource.paginator) {
      this.itemsprDataSource.paginator.firstPage();
    }
  }

  get items(): FormArray {
    return this.productForm.get('items') as FormArray;
  }

  fetchProducts(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.dashboardService.getAllProducts().subscribe(
      (response: any) => {
        console.log('Fetched Products:', response);
        if (Array.isArray(response) && response.length > 0) {
          this.itemspr = response;

          // Create a MatTableDataSource with products
          this.itemsprDataSource = new MatTableDataSource<any>(this.itemspr);

          // Setup custom filter predicate for searching across all fields
          this.itemsprDataSource.filterPredicate = (
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
              (data.regularBuyingPrice || 'n/a');

            return searchTerms.every((term) => dataStr.includes(term));
          };

          // Connect the paginator
          if (this.productsPaginator) {
            this.itemsprDataSource.paginator = this.productsPaginator;
          }

          this.showProductTable = true;

          // Use setTimeout to ensure the view is updated before attempting to set the paginator
          setTimeout(() => {
            // Connect the paginator after the data is loaded and view is updated
            if (this.productsPaginator) {
              this.itemsprDataSource.paginator = this.productsPaginator;
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
      this.items.removeAt(index);
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
        regularBuyingPrice: selectedProduct.regularBuyingPrice,
        quantity: 1,
        subTotal: selectedProduct.regularBuyingPrice,
      };

      this.selectedProducts.push(productData);

      // Add product to FormArray
      const productGroup = this.fb.group({
        itemId: [selectedProduct.id, Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
        price: [selectedProduct.regularBuyingPrice, Validators.required],
        subTotal: [selectedProduct.regularBuyingPrice, Validators.required],
      });

      productGroup.get('quantity')?.valueChanges.subscribe((newQuantity) => {
        this.updateSubtotal(selectedProduct.id, newQuantity);
      });

      this.items.push(productGroup);
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
    this.productForm.patchValue({
      totalAmount: totalAmount,
    });
  }

  updateSubtotal(productId: number, newQuantity: number): void {
    if (newQuantity && newQuantity > 0) {
      const product = this.selectedProducts.find((p) => p.id === productId);
      if (product) {
        product.quantity = newQuantity;
        product.subTotal = product.regularBuyingPrice * newQuantity;

        // Update FormArray value
        const index = this.selectedProducts.findIndex(
          (p) => p.id === productId
        );
        if (index !== -1) {
          this.items.at(index).patchValue({
            quantity: newQuantity,
            subTotal: product.subTotal,
          });

          this.productForm.markAsDirty();
          this.updateTotalAmount();
        }
      }
    }
  }

  removeProduct(index: number, event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.selectedProducts.splice(index, 1);
    this.items.removeAt(index);
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

  submitProduct(): void {
    if (this.productForm.valid && this.selectedProducts.length > 0) {
      const purchData = {
        // supplierName: this.productForm.value.supplierName || null,
        totalAmount: Number(this.productForm.get('totalAmount')?.value) || 0,
        branchId:
          Number(this.selectedProducts.find((p) => p.branchId)?.branchId) || 0,
        items: this.selectedProducts.map((product) => ({
          itemId: product.id, // Changed from item_id to match backend expectation
          quantity: Number(product.quantity),
          price: Number(product.regularBuyingPrice),
          subTotal: Number(product.subTotal),
        })),
       
      };

      console.log(
        'Sending sale transaction data to API:',
        JSON.stringify(purchData, null, 2)
      );

      this.dashboardService.createPrc(purchData).subscribe(
        () => {
          alert('Sale successfully created!');
          this.showProductTable = false;

          this.productForm.reset();
          this.items.clear();
          this.selectedProducts = [];
          this.refreshSelectedProductsTable();
        },
        (err) => {
          console.error('Error processing sale:', err);
          alert('Failed to create sale.');
        }
      );
    } else {
      this.showProductTable = true;
    }
  }
}
