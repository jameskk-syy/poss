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
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Ensure pdfMake has access to fonts
(pdfMake as any).vfs = (pdfFonts as any).vfs;

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.sass'],
})
export class QuotesComponent implements OnInit, AfterViewInit {
  saleForm: FormGroup; // The main sales form
  items: any[] = []; // Stores all available products
  itemsDataSource = new MatTableDataSource<any>([]); //display all available products.
  selectedProducts: any[] = []; // Stores selected products for sale
  selectedProductsDataSource = new MatTableDataSource<any>([]); //  display products selected for sale.
  showProductTable: boolean = false; // Controls visibility of product table
  totalAmountInWords: string = ''; // Converts total amount to words
  isCreditSale: boolean = false; // Tracks if the sale is on credit
  balance: string = '0'; // Stores balance calculation
  searchControl = new FormControl(''); // For searching/filtering products

  customers: any[] = []; // Store customer list
  filteredCustomers: Observable<any[]>; // Observable for filtering
  customerNameControl = new FormControl(''); // Control for autocomplete

  @ViewChild('selectedProductsPaginator')
  selectedProductsPaginator: MatPaginator;
  @ViewChild('productsPaginator') productsPaginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {
    this.saleForm = this.fb.group({
      customerName: '',
      saleOrderLines: this.fb.array([]),
      totalAmount: [{ value: 0, disabled: true }, Validators.required],
      amountPaid: [{ value: 0, disabled: !this.isCreditSale }],
    });
  }

  ngOnInit(): void {
    this.saleForm.get('totalAmount')?.valueChanges.subscribe((value) => {
      this.totalAmountInWords = this.convertNumberToWords(value) + '';
      this.calculateBalance();
    });

    this.saleForm.get('amountPaid')?.valueChanges.subscribe(() => {
      this.calculateBalance();
    });

    // Setup search filtering
    this.searchControl.valueChanges.subscribe((searchTerm) => {
      this.applyFilter(searchTerm);
    });

    // Fetch Customers
    this.dashboardService.getAllCustomers().subscribe((response: any) => {
      this.customers = response;
      console.log('Fetched Customers:', this.customers);
      this.filteredCustomers = this.customerNameControl.valueChanges.pipe(
        startWith(''),
        map((value) => this.filterCustomers(value || ''))
      );
    });
  }
  ngAfterViewInit() {
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

  // customers
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
          this.cdr.detectChanges();
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
    if (this.selectedProductsPaginator) {
      this.selectedProductsDataSource.paginator =
        this.selectedProductsPaginator;
    }
    this.cdr.detectChanges();
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
      this.saleForm.get('amountPaid')?.enable();
    } else {
      this.saleForm.get('amountPaid')?.disable();
    }
  }

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

  generateQuotation(): void {
    if (this.saleForm.valid && this.selectedProducts.length > 0) {
      const totalAmount = this.saleForm.get('totalAmount')?.value || 0;

      const docDefinition: any = {
        content: [
          { text: 'Quotation', style: 'header' },
          {
            text: `Customer Name: ${this.saleForm.value.customerName || 'N/A'}`,
            margin: [0, 10, 0, 10],
          },
          {
            table: {
              headerRows: 1,
              widths: ['*', 'auto', 'auto', 'auto'],
              body: [
                ['Item', 'Quantity', 'Price', 'Subtotal'],
                ...this.selectedProducts.map((product) => [
                  // product.id,
                  product.name || 'N/A',
                  product.quantity || 0,
                  product.sellingPrice || 0,
                  product.subTotal || 0,
                ]),
                [
                  { text: 'Total', colSpan: 3, alignment: 'right' },
                  '', // Correct way to handle colSpan
                  '',
                  { text: `${totalAmount}`, bold: true }, // Ensure value exists
                ],
              ],
            },
          },
        ],
        styles: {
          header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
        },
      };

      pdfMake.createPdf(docDefinition).open(); // Open in a new tab
    } else {
      alert(
        'Please add products and fill in customer details to generate a quotation.'
      );
    }
  }
}
