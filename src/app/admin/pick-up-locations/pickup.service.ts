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
export class PickupService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  url = `${environment.apiUrl}/api/v1/pickuplocations/`;

  routesUrl = `${environment.apiUrl}/api/v1/routes/`;

  public getLocations(): Observable<any> {
    return this.http.get<any>(this.url + 'fetch');
  }
 

  public getLocationById(id:any): Observable<any> {
    return this.http.get<any>(this.url + id);
  }

  updateLocation(data: any): Observable<any> {
    return this.http.put(this.url + 'update', data, httpOptions);
  }

  deleteLocation(id: any): Observable<any> {
    return this.http.delete(this.url + id, httpOptions);
  }

  //Routes

  addNewRoute(data: any): Observable<any> {
    return this.http.post(this.routesUrl + 'add', data, httpOptions);
  }

  public getRoutes(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/routes/get` );
  }

  public getRouteById(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/routes/get/id?id=${id}` );
  }

}
