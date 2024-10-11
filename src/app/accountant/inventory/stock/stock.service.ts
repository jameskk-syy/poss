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

  stockUrl = `${environment.apiUrl}/api/v1/category/`;

  public getStock(): Observable<any> {
    return this.http.get(this.stockUrl + 'get').pipe (
      catchError(this.handleError)
    )
  }

  addNewStock(data: any): Observable<any> {
    return this.http.post(this.stockUrl + 'add', data, httpOptions).pipe (
      catchError(this.handleError)
    )
  }

  deleteStock(id: any): Observable<any> {
    return this.http.delete(this.stockUrl + `delete/` + id, httpOptions).pipe (
      catchError(this.handleError)
    )
  }

  updateStock(data: any,id:number): Observable<any> {
    return this.http.put(this.stockUrl + `update/${id}`, data, httpOptions).pipe (
      catchError(this.handleError)
    )
  }

  public getProducts(whseCode: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/stock/warehouse/${whseCode}`);
  }

  private handleError(error: any) {
    console.error('Error occurred:', error);
    let errorMessage = 'An unknown error occurred';

    if (error.error && error.error.message) {
        errorMessage = error.error.message;  
    }

    if (error.status === 400) {
        errorMessage = `Bad Request: ${errorMessage}`; 
    }

    return throwError(() => new Error(errorMessage));
}



}


