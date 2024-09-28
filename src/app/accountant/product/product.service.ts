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
export class ProductService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  deptsUrl = `${environment.apiUrl}/api/v1/category/`;

//categories
  public getCategories(): Observable<any> {
    return this.http.get(this.deptsUrl + 'get');
  }

  addNewCategory(data: any): Observable<any> {
    return this.http.post(this.deptsUrl + 'add', data, httpOptions);
  }

  deleteCategory(id: any): Observable<any> {
    return this.http.delete(this.deptsUrl + `delete/` + id, httpOptions);
  }

  updateCategory(data: any): Observable<any> {
    return this.http.put(this.deptsUrl + `update`, data, httpOptions);
  }

  //products
  public getProducts(): Observable<any> {
    return this.http.get(this.deptsUrl + 'get');
  }

  addProduct(data: any): Observable<any> {
    return this.http.post(this.deptsUrl + 'add', data, httpOptions);
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(this.deptsUrl + `delete/` + id, httpOptions);
  }

  updateProduct(data: any): Observable<any> {
    return this.http.put(this.deptsUrl + `update`, data, httpOptions);
  }

}






















