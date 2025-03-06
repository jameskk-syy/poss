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
  reportFilterForm: FormGroup;
  reportDataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['position', 'name', 'details', 'createdAt', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fb: FormBuilder, private dashboardService: DashboardService) {
    this.reportFilterForm = this.fb.group({
      // reportType: ['sales'],  // Default to sales reports
      startDate: [''],
      endDate: [''],
    });
  }

  ngOnInit(): void {
    // Optionally, load initial report data if needed
    // this.fetchReports('sales', '', '');
  }

  onFilterReports(): void {
    const {  startDate, endDate } = this.reportFilterForm.value;
    this.fetchReports(startDate, endDate);
  }

  // fetchReports(startDate: string, endDate: string): void {
  //   this.dashboardService.getReports(startDate, endDate).subscribe(data => {
  //     this.reportDataSource.data = data;
  //     this.reportDataSource.paginator = this.paginator; // Set paginator after data load
  //   }, error => {
  //     console.error('Error fetching reports:', error);
  //     // Handle error (e.g., show a notification to the user)
  //   });
  // }

  fetchReports(startDate: string, endDate: string): void {
    this.dashboardService.getReports(startDate, endDate);
  }

  viewReport(reportId: number): void {
    // Implement logic to view the specific report
    console.log('Viewing report with ID:', reportId);
    // You might navigate to a detailed view or open a modal
  }

  deleteReport(reportId: number): void {
    // Implement logic to delete the report
    console.log('Deleting report with ID:', reportId);
    // Call the delete API and refresh the report list
  }
}