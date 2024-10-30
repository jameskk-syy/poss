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
export class InvoiceService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  invoiceUrl = `${environment.apiUrl}/api/v1/invoice/`;
 

  addInvoice(data):Observable<any>{
    return this.http.post(this.invoiceUrl + `add`, data, httpOptions)
  }
  
  getInvoices():Observable<any>{
    return this.http.get(this.invoiceUrl + `get/all`, httpOptions)
  }


}






