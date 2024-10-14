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
  customersUrl = `${environment.apiUrl}/api/v1/customer/`
  salespersonUrl = `${environment.apiUrl}/api/v1/sales-person/`

  constructor(private http: HttpClient) { 

  }
 
  public getUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/admin/api/v1/users/all-accounts`,httpOptions);
  }

  public getWarehouses(): Observable<any> {
    return this.http.get(this.warehouseUrl + `/get/all`)
  }

  public getSkus(): Observable<any> {
    return this.http.get(this.skuUrl + `get`)
  }

  public getCustomers():Observable <any> {
    return this.http.get(this.customersUrl + `all`)
  }

  public getSalesperson(): Observable <any> {
    return this.http.get(this.salespersonUrl + 'get')
  }

   
}
