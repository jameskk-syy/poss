import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  customersUrl = `${environment.apiUrl}/api/v1/customer/`

  constructor(private http: HttpClient) { 

  }

  public fetchCustomers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/customer/all`, httpOptions)
  }

  public addCustomer(data: any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/api/v1/customer/add`, data, httpOptions)
  }

  public updateCustomer(data: any): Observable<any>{
    return this.http.put(`${environment.apiUrl}/api/v1/customer/update`, data, httpOptions)
  }

  public fetchByID(id: any): Observable<any>{
    return this.http.get(`${environment.apiUrl}/api/v1/customer/customer/id?customerId=${id}`, httpOptions)
  }

  public fetchByStatus(status: any): Observable<any>{
    return this.http.get(`${environment.apiUrl}/api/v1/customer/customer/status?status=${status}`)
  }


}
