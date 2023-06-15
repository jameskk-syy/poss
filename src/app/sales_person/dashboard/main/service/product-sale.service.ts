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
  generateReceipt(arg0: { salesCode: any; salesPersonFk: any; }):Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/pdf' });
    return this.http.get(`${this.baseUrl}/reports/sales?salesCode=${arg0.salesCode}&salesPersonId=${arg0.salesPersonFk}`,{headers,responseType: 'blob',});
  }
  getPrices(routeFk:number):Observable<any> {
    return this.http.get(`${this.baseUrl}/product/configuration/get/by-routefk/${routeFk}`,httpOptions)
  }
  
  baseUrl = `${environment.apiUrl}/api/v1`
  constructor(private http: HttpClient) { }
  public fetchAllSalesBySalesPersonFk(salesPersonFk:any):Observable<any>{
    return this.http.get(`${this.baseUrl}/sales/fetch-sales-by-sales-person/${salesPersonFk}`,httpOptions)
  }

  public fetchRoutes():Observable<any>{
    return this.http.get(`${this.baseUrl}/routes/get`,httpOptions)
  }
  findCustomerById(customerFk: number):Observable<any> {
    return this.http.get(`${this.baseUrl}/customer/customer/id?customerId=${customerFk}`);
  }
  fetchSalesBySalesCode(code: any):Observable<any> {
    return this.http.get(`${this.baseUrl}/sales/fetch-sale/${code}`);
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
}
