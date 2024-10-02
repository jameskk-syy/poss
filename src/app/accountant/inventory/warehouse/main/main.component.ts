import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WarehouseService } from '../warehouse.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  loading: boolean = false
  data: boolean = false
  dataSource: MatTableDataSource<any>

  displayedColumns: any = ['id', 'code', 'name', 'description', 'status', 'created_on']

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  constructor(private service: WarehouseService, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (res: any) => {
        if (res.entity.length > 0) {
          this.loading = false
          this.data  =true

          this.dataSource = new MatTableDataSource(res.entity)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        } else {
          this.loading = false
          this.data = false

          this.dataSource = new MatTableDataSource(null)
        }
      },
      error: (err) => {
        this.loading = false
        this.data = false
        console.log("caught error is ", err)
        this.snackbar.showNotification('snackbar-danger', err)
      },
      complete: () => {}
    })
  }

  create() {}

  
  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
