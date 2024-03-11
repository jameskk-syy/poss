import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class TotalsCollectionService {
  getRoutesData(): Observable<any> {
    throw new Error('Method not implemented.');
  }
  getTotalsCollectionByDate(date: any):Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/accumulation/get/date?date=` + date, httpOptions);
  }
  getCollectorRoutes(id: any):Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/routes/colector?collectorId=` + id);
  }

  private eventSource = new Subject<any>();
  event$ = this.eventSource.asObservable();
  baseUrl: any;

  emitEvent(event: any) {
    this.eventSource.next(event);
  }
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  getAccumulationsByAccumulatorId(accumulatorId: any): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/accumulation/by-accumulator/${accumulatorId}`;
    return this.http.get(url);
  }
  getCollectorsIdAccumulations(collectorId: any): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/accumulation/${collectorId}`;
    return this.http.get(url, httpOptions);
  }
  getAllAccumulations(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/accumulation/all`,httpOptions); 
   }
  getAllAccumulatorNames(roleName: string):Observable<any> {
// return this.http.get(`${environment.apiUrl}/api/v1/users/users-by-role-name?roleName/${roleName}`, httpOptions);
return this.http.get(`${environment.apiUrl}/admin/api/v1/users/users-by-role-name?roleName=` + roleName, httpOptions);
}
getAllRouteNames():Observable<any> {
  return this.http.get(`${environment.apiUrl}/api/v1/routes/fetch`,httpOptions); 
}
getAllCollectorByNames(): Observable<any> {
  return this.http.get(`${environment.apiUrl}/api/v1/collectors/all`,httpOptions); 
}

getCollectRoutes(date: any): Observable<any> {
  return this.http.get(`${environment.apiUrl}/api/v1/accumulation/get/route-summary/date?date=`+date,httpOptions); 
  
}
  // http: any;
  addTotalsCollections(value: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/v1/accumulation/add`,
    {
     collectorId:value.collectorId,
      milkQuantity:value.milkQuantity,
      session: value.session,
      accumulatorId:value.accumulatorId,
      routeFk: value.routeFk,
      ph: value.ph,
      density: value.density,
      resazurin: value.resazurin,
      sight: value.sight,
      smell: value.sight,
      temperature: value.temperature
    },httpOptions);   }



  // constructor() { }
}
