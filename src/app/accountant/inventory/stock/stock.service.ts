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

export class StockService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  stockUrl = `${environment.apiUrl}/api/v1/stock/`;

  public getStock(): Observable<any> {
    return this.http.get(this.stockUrl + `warehouse/master`)
  }

  addNewStock(action:string, data: any): Observable<any> {
    if(action === 'remove'){
    return this.http.post(this.stockUrl + `remove/`,data, httpOptions)
    }
    else{
      return this.http.post(this.stockUrl + `add/`,data, httpOptions)
    }
  }

  deleteStock(id: any): Observable<any> {
    return this.http.delete(this.stockUrl + `delete/` + id, httpOptions)
  }

  updateStock(data: any,id:number): Observable<any> {
    return this.http.put(this.stockUrl + `update/${id}`, data, httpOptions)
  }

  public getProducts(whseCode: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/stock/warehouse/${whseCode}`);
  }

}


