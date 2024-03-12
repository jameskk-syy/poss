import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { error } from 'console';
import { UserService } from 'src/app/data/services/user.service';
import { MainComponent } from 'src/app/reports/main/main.component';

@Component({
  selector: 'app-sub-collectors-lookup',
  templateUrl: './sub-collectors-lookup.component.html',
  styleUrls: ['./sub-collectors-lookup.component.sass']
})
export class SubCollectorsLookupComponent implements OnInit {
  users: any
  loading: boolean = true
  subcollectors: any[] = []

  displayedColumns = ["select", "username", "mobile", "email"]
  @ViewChild(MatPaginator) paginator : MatPaginator
  @ViewChild(MatSort) sort : MatSort
  dataSource: MatTableDataSource<any>
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);
  constructor(public dialogRef: MatDialogRef<MainComponent>, @Inject(MAT_DIALOG_DATA) public data, private userService: UserService ) { }

  ngOnInit(): void {
    this.getSubCollectors();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  selectActionSubjects(){
    this.dialogRef.close({ event: "close", data: this.selection.selected });
  }

  onSelectRow(data: any) {
    this.dialogRef.close({ event: "close", data: data });
  }

  onCancel(){
    this.dialogRef.close();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSubCollectors() {
    this.userService.getAllSubCollectors().subscribe({
      next: (data: any) => {
        let users = data.entity

        users.forEach(user => {
          if(user.role==="SUB_COLLECTOR") {
            this.subcollectors.push(user);
          }
        })

        if(this.subcollectors.length > 0) {
          this.loading = false;
          this.dataSource = new MatTableDataSource<any>(this.subcollectors);
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        } else {
          this.loading = false
        }
      },
      error: (error) => {
        console.log("the error is "+error)
      }
    })
  }

}
