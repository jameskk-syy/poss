import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class SalespersonService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  salespersonUrl = `${environment.apiUrl}/api/v1/sales-person/`;
  customerUrl = `${environment.apiUrl}/api/v1/customer/`;


  onBoardSalesperson(id, whseCode, customer):Observable<any> {
    return this.http.post(this.salespersonUrl + `onboard/${id}/${whseCode}`, customer, httpOptions)
  }

  public getSalesperson():Observable<any>{
    return this.http.get(this.salespersonUrl + `get/all`,httpOptions)
  }

  getCustomers(salesPersonId){
    return this.http.get(this.customerUrl + `get/salesperson/${salesPersonId}`)
  }

  removeCustomer(salesPersonId, customerId): Observable<any>{
    return this.http.put(this.salespersonUrl + `remove/customer/${salesPersonId}/${customerId}`,{})
  }

  addCustomer(salespersonId, data): Observable<any>{
    return this.http.put(this.salespersonUrl + `add/customers/${salespersonId}`,data)
  }

}


