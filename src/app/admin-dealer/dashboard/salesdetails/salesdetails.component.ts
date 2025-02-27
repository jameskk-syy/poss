import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';

@Component({
  selector: 'app-salesdetails',
  templateUrl: './salesdetails.component.html',
  styleUrls: ['./salesdetails.component.sass']
})
export class SaleDetailComponent implements OnInit {
  sale: any;
  saleId: string | null = null;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.saleId = this.route.snapshot.paramMap.get('id');
    if (this.saleId) {
      this.getSaleDetails(this.saleId);
    } else {
      this.error = true;
      this.loading = false;
    }
  }

  getSaleDetails(id: string): void {
    this.dashboardService.getSaleById(id).subscribe(
      (data: any) => {
        this.sale = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching sale details:', error);
        this.error = true;
        this.loading = false;
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}