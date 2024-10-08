import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  categoryUrl = `${environment.apiUrl}/api/v1/category/`;
  productUrl = `${environment.apiUrl}/api/v1/products/`;
  skuUrl = `${environment.apiUrl}/api/v1/sku/`;

//categories
  public getCategories(): Observable<any> {
    return this.http.get(this.categoryUrl + 'get').pipe (
      catchError(this.handleError)
    )
  }

  addNewCategory(data: any): Observable<any> {
    return this.http.post(this.categoryUrl + 'add', data, httpOptions).pipe (
      catchError(this.handleError)
    )
  }

  deleteCategory(id: any): Observable<any> {
    return this.http.delete(this.categoryUrl + `delete/` + id, httpOptions).pipe (
      catchError(this.handleError)
    )
  }

  updateCategory(data: any,id:number): Observable<any> {
    return this.http.put(this.categoryUrl + `update/${id}`, data, httpOptions).pipe (
      catchError(this.handleError)
    )
  }

  //products
  public getProducts(): Observable<any> {
    return this.http.get(this.productUrl + `get`).pipe (
      catchError(this.handleError)
    )
  }

  addProduct(data: any, id: number): Observable<any> {
    return this.http.post(this.productUrl + `add/${id}`, data, httpOptions).pipe (
      catchError(this.handleError)
    )
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(this.productUrl + `del/` + id, httpOptions).pipe (
      catchError(this.handleError)
    )
  }

  updateProduct(data: any, id: number): Observable<any> {
    return this.http.put(this.productUrl + `update/${id}`, data, httpOptions).pipe (
      catchError(this.handleError)
    )
  }

  //sku
  public getSkus(): Observable<any> {
    return this.http.get(this.skuUrl + `get`).pipe (
      catchError(this.handleError)
    )
  }

  addSku(data: any, productId: number, priceId:number): Observable<any> {
    return this.http.post(this.skuUrl + `add/${productId}/${priceId}`, data, httpOptions).pipe (
      catchError(this.handleError)
    )
  }

  deleteSku(id: any): Observable<any> {
    return this.http.delete(this.skuUrl + `del/` + id, httpOptions).pipe (
      catchError(this.handleError)
    )
  }

  updateSKu(data: any, skuId: number, priceId:number): Observable<any> {
    return this.http.put(this.skuUrl + `update/${skuId}/${priceId}`, data, httpOptions).pipe (
      catchError(this.handleError)
    )
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






















