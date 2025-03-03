import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.sass']
})
export class ExpensesComponent implements OnInit, AfterViewInit {
  
  displayedColumns: string[] = ['position', 'amount', 'description', 'expenseType', 'branch'];
  dataSource = new MatTableDataSource<any>();
  exps: FormGroup;
  branches: any[] = [];
  isFormOpen = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private dashboardService: DashboardService) {
    this.exps = this.fb.group({
      amount: [0, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
      expenseType: ['', [Validators.required]],
      branchId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  loadData(): void {
    Promise.all([
      this.getBranches(),
    ]).then(() => {
      this.getExps();
    });
  }
  getBranches(): Promise<void> {
    return new Promise((resolve) => {
      this.dashboardService.getAllBranches().subscribe(
        (response: any) => {
          if (response && response.data) {
            this.branches = response.data;
          }
          resolve();
        },
        (error) => {
          console.error(' Error fetching branches:', error);
          resolve();
        }
      );
    });
  }
  getExps(): void {
    this.dashboardService.getExpenses().subscribe(
      (data) => {
        console.log("Fetched Products:", data);
        console.log("Branches:", this.branches);

        this.dataSource =new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;

        console.log(" Processed Data Source:", this.dataSource);
      },
      (error) => {
        console.error(' Error fetching products:', error);
      }
    );
  }

 toggleForm(): void {
    this.isFormOpen = !this.isFormOpen;
  }
  onSubmit(): void {
    if (this.exps.valid) {
        this.addWithdwals();
    }
  }
  addWithdwals(): void {
    this.dashboardService.addExpense(this.exps.value).subscribe(
      res => {
        alert(res.message);
        this.exps.reset();
        this.isFormOpen = false;
        this.getExps(); // Fetch updated data after successful submission

      },
      err => {
        console.error(' Error adding expense:', err);
      }
    );
  }

}
