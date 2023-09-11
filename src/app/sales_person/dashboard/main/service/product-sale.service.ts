import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { request } from 'https';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductSaleService {
  getPushNotificationStatus(CheckoutRequestID: any):Observable<any> {
    return this.http.post(`${this.baseUrl}/mobile-money/stk-transaction-status`,{
      CheckoutRequestID
    },httpOptions)
  }
 
  baseUrl = `${environment.apiUrl}/api/v1`
  constructor(private http: HttpClient) { }
  public fetchAllSalesBySalesPersonFk(salesPersonFk:any):Observable<any>{
    return this.http.get(`${this.baseUrl}/sales/fetch-sales-by-sales-person/${salesPersonFk}`,httpOptions)
  }
  pushNotification(arg0: { amount: number; mpesa_number: string; }) {
    return this.http.post(`${this.baseUrl}/transactions/stk-push`,{
      amount:arg0.amount,
      phoneNumber:arg0.mpesa_number
    },httpOptions)
  }
  generateReceipt(arg0: { salesCode: any; salesPersonFk: any; }):Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/pdf' });
    return this.http.get(`${this.baseUrl}/reports/sales?salesCode=${arg0.salesCode}&salesPersonId=${arg0.salesPersonFk}`,{headers,responseType: 'blob',});
  }
  getPrices(routeFk:number):Observable<any> {
    return this.http.get(`${this.baseUrl}/product/configuration/get/by-routefk/${routeFk}`,httpOptions)
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
  public addSale(paymentMode: any):Observable<any>{
    paymentMode.paymentStatus = 'N';
    paymentMode.deletedFlag = 'N';
    paymentMode.salesCode = ''
    // paymentMode.id = 0;
    paymentMode.isReceiptGeneratedFag="N"
    // delete data.paymentMethod
    // console.log(data)

    return this.http.post(`${this.baseUrl}/sales/add/${paymentMode}`, httpOptions);
  }
}
