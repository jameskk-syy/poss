import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LookupsService {
  
  usersUrl = `${environment.apiUrl}/api/v1/users/`;
  warehouseUrl = `${environment.apiUrl}/api/v1/warehouse`;
  skuUrl = `${environment.apiUrl}/api/v1/sku/`;

  constructor(private http: HttpClient) { 

  }
 
  public getUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/admin/api/v1/users/all-accounts`,httpOptions);
  }

  public getWarehouses(): Observable<any> {
    return this.http.get(this.warehouseUrl + `/get/all`).pipe (
      catchError(this.handleError))
  }

  public getSkus(): Observable<any> {
    return this.http.get(this.skuUrl + `get`).pipe (
      catchError(this.handleError)
    )
  }

  private handleError(error: any) {
    console.error('Error occurred:', error);
    let errorMessage = 'An unknown error occurred';

    if (error.error && error.error.message) {
        errorMessage = error.error.message;  
    }

    if (error.status === 400) {
        errorMessage = `Bad Request: ${errorMessage}`; 
    }

    return throwError(() => new Error(errorMessage));
}
}
