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

export class CustomerService {

  customersUrl = `${environment.apiUrl}/api/v1/customer/`

  constructor(private http: HttpClient) { 

  }
 
  public fetchCategory(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/customer-category/get/all`, httpOptions)
  }

  public fetchCustomers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/customer/all`, httpOptions)
  }

  public addCustomer( catId: any, data: any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/api/v1/customer/add/${catId}`,data, httpOptions )
  }

  public addCategory(data: any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/api/v1/customer-category/add`, data, httpOptions)
  }

  public updateCustomer(id: any, catId: any, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/v1/customer/update/${id}/${catId}`, data, httpOptions);
  }

  public fetchByID(id: any): Observable<any>{
    return this.http.get(`${environment.apiUrl}/api/v1/customer/customer/id?customerId=${id}`, httpOptions)
  }
 
  public fetchByStatus(status: any): Observable<any>{
    return this.http.get(`${environment.apiUrl}/api/v1/customer-category/get/${status}`)
  }

  public deleteCustomer(id: any): Observable<any>{
    return this.http.delete(`${environment.apiUrl}/api/v1/customer-category/del/${id}`)
  }

  public deleteCategory(id: any): Observable<any>{
    return this.http.delete(`${environment.apiUrl}/api/v1//customer/delete/${id}`)
  }

  public fetchRoutes(): Observable<any>{
    return this.http.get(`${environment.apiUrl}/api/v1/routes/get`)
  }

}
