import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductSaleService {
  public fetchAllSalesBySalesPersonFk(salesPersonFk:any):Observable<any>{
    return this.http.get(`${this.baseUrl}/sales/fetch-sales-by-sales-person/3`,httpOptions)
  }
  fetchSalesBySalesCode(code: any):Observable<any> {
    return this.http.get(`${this.baseUrl}/sales/fetch-sale/${code}`);
  }
  baseUrl = `${environment.apiUrl}/api/v1`
  constructor(private http: HttpClient) { }
  // public fetchAllSales():Observable<any>{
  //   return this.http.get(`${this.baseUrl}/sales/fetch/all`,httpOptions)
  // }

  public fetchRoutes():Observable<any>{
    return this.http.get(`${this.baseUrl}/routes/get`,httpOptions)
  }

  public fetchCustomers():Observable<any>{
    return this.http.get(`${this.baseUrl}/customer/all`,httpOptions)
  }

  public fetchSalesPersons():Observable<any>{
    return this.http.get(`${environment.apiUrl}/admin/api/v1/users/users-by-role-name?roleName=SALES_PERSON`,httpOptions)
  }
  public addSale(data: any):Observable<any>{
    data.paymentStatus = 'N';
    data.deletedFlag = 'N';
    data.salesCode = ''
    data.id = 0;
    console.log(data)

    return this.http.post(`${this.baseUrl}/sales/add`, data, httpOptions);
  }
  fetchAllSales(params: any):Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/sales/fetch/all`,httpOptions);
  }
}
