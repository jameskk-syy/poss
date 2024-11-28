import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  alertWarning(arg0: string) {
    throw new Error('Method not implemented.');
  }
  showSnackbar: any;

  constructor(private snackBar: MatSnackBar) { }

  showNotification(colorName, text) {
    this.snackBar.open(text, "", {
      duration: 7000,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: colorName,
    });
  }
}
