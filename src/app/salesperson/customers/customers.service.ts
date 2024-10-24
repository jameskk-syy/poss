import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  customerUrl = `${environment.apiUrl}/api/v1/customer/`;


  getCustomers(userId){
    return this.http.get(this.customerUrl + `get/salesperson/${userId}`)
  }

  addCustomer(categoryId, data):Observable<any>{
    return this.http.post<any>(this.customerUrl + `add/${categoryId}`,data)
  }

 
}


  
