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
export class DashboardService {
  getTotalsCollectionByDate(date: any):Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/accumulation/get/date?date=` + date, httpOptions);
  }
  getAccumulationsByAccumulatorId(accumulatorId: any, date: any): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/accumulation/by-accumulator/${accumulatorId}/${date}`;
    return this.http.get(url);
  }
  getCollectorsIdAccumulations(collectorId: any): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/accumulation/${collectorId}`;
    return this.http.get(url, httpOptions);
  }
  getAllAccumulations(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/accumulation/all`,httpOptions); 
   }


   headers = new HttpHeaders().set('Content-Type', 'application/json');
   constructor(private http: HttpClient) { }}
