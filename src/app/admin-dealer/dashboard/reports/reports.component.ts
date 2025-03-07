import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.sass'],
})
export class ReportsComponent implements OnInit {
  salesReportForm: FormGroup;
  purchasesReportForm: FormGroup;
  expenseReportForm: FormGroup;
  incomeReportForm: FormGroup;

  activeReportForm: string | null = null;

  reportDataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['position', 'name', 'details', 'createdAt', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fb: FormBuilder, private dashboardService: DashboardService) {
    // Initialize forms for each report type
    this.salesReportForm = this.fb.group({
      startDate: [''],
      endDate: [''],
    });

    this.purchasesReportForm = this.fb.group({
      startDate: [''],
      endDate: [''],
    });

    this.expenseReportForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      expenseType: [''],
    });

    this.incomeReportForm = this.fb.group({
      startDate: [''],
      endDate: [''],
    });
  }

  ngOnInit(): void {
    this.activeReportForm = null;
  }

  toggleReportForm(formType: string): void {
    this.activeReportForm = this.activeReportForm === formType ? null : formType;
  }

  closeReportForm(): void {
    this.activeReportForm = null;
  }

  getReportTitle(formType: string): string {
    switch (formType) {
      case 'sales':
        return 'Sales Report';
      case 'purchases':
        return 'Purchases Report';
      case 'expense':
        return 'Expense Report';
      case 'pl':
        return 'P&L Report';
      default:
        return 'Report';
    }
  }

  getActiveForm(): FormGroup {
    switch (this.activeReportForm) {
      case 'sales':
        return this.salesReportForm;
      case 'purchases':
        return this.purchasesReportForm;
      case 'expense':
        return this.expenseReportForm;
      case 'pl':
        return this.incomeReportForm;
      default:
        return this.salesReportForm;
    }
  }

  onFilterSalesReport(): void {
    const { startDate, endDate } = this.salesReportForm.value;
    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }
    this.fetchReports(startDate, endDate);
  }

  onFilterPurchasesReport(): void {
    const { startDate, endDate } = this.purchasesReportForm.value;
    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }
    this.getPrReports(startDate, endDate);
  }

  onFilterExpenseReport(): void {
    const { startDate, endDate, expenseType } = this.expenseReportForm.value;
    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }
    this.getExpreport(startDate, endDate, expenseType || '');
  }

  onFilterIncomeReport(): void {
    const { startDate, endDate } = this.incomeReportForm.value;
    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }
    this.fetchReports(startDate, endDate);
  }

  fetchReports(startDate: string, endDate: any): void {
    this.dashboardService.getReports(startDate, endDate);
  }

  getPrReports(startDate: string, endDate: any): void {
    this.dashboardService.purchaseReport(startDate, endDate);
  }

  getExpreport(startDate: string, endDate: string, expenseType: string): void {
    this.dashboardService.expReports(startDate, endDate, expenseType);
  }

  viewReport(reportId: number): void {
    console.log('Viewing report with ID:', reportId);
  }

  deleteReport(reportId: number): void {
    console.log('Deleting report with ID:', reportId);
  }
}
