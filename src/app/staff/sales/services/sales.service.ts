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
export class SalesService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }


  getCollections(date: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/specific/date?date=` + date, httpOptions);
  }

  getAllCollections() {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/all`, httpOptions);
  }
  getTodaysCollections(date: any) {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/specific/date?date=${date}`, httpOptions);
  }
  getCollectionsPerPickUpLocation(id:any) {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/pickupLocations?pickUpLocation=`+id, httpOptions);
  }
  getCollectionsByFarmerNo(id:any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/per/farmer?farmerId=` +id,httpOptions);
  }
  getCollectionsPerPRoute(id:any) {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/route?routeId=`+id, httpOptions);
  }

  

  getTodayCollections() {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/collections/today/collector`, httpOptions);

  }
  getCollectionsDateRange(fromDate: any, toDate: any) {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/date/range?fromdate=${fromDate}&toDate=${toDate}`, httpOptions);
  }

  allocateFloat() {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/collections/today/collector`, httpOptions);
  }

  getCollectorAllocations() {
    return this.http.get(`${environment.apiUrl}/api/v1/float/get/allocations`, httpOptions);

  }
  getFarmerCollections(id: any) {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/per/farmer?farmerId=` + id, httpOptions);
  }

  getFarmerDetails(id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/farmers/details?farmerId=` + id, httpOptions);
  }

  deleteFarmerDetails(id: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/v1/farmer/delete/` + id, httpOptions);
  }

  allocateFloatToCollector(data: any) {
    return this.http.post(`${environment.apiUrl}/api/v1/float/allocate`, data, httpOptions);
  }

  milkCollectionsPerCollectorInPerYear(year: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/analytics/year?year=` + year, httpOptions);
  }

  getFarmerAccruals(farmerId: any, paymentStatus: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/accruals?farmerId=` + farmerId + `&paymentStatus=` + paymentStatus, httpOptions);
  }

  getAllCollectors(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/analytics/roleUsers?roleId=2`, httpOptions);
  }

  getCollectorLocationsByDate(collectorId: any, date: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/collector/routes?collectorId=${collectorId}&date=${date}`, httpOptions);
  }


  getSales(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/allocations/get`, httpOptions);
  }
  getSalesPerType(type:any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/allocations/type?type=`+type, httpOptions);
  }


  
  addAllocation(data: any) {
    return this.http.post(`${environment.apiUrl}/api/v1/farmer/allocations/add`, data, httpOptions);
  }

  verifyAllocatins(id:any,status:any){
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/allocations/verify?id=`+id+`&status=`+status, httpOptions);

  }
  updateCollections(data: any) {
    return this.http.put(`${environment.apiUrl}/api/v1/collections/update`, data, httpOptions);
  }


  getAllFarmers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/get`, httpOptions);
  }


  getAllProducts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/products/all`, httpOptions);
  }

  getAllocationsByDate(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/products/all`, httpOptions);
  }

  getFarmerAllocations(farmerId): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/allocations/farmer?farmerId=` + farmerId, httpOptions);
  }

  getFarmerAllocationsByDate(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/products/all`, httpOptions);
  }

  getFarmerAllocationsPerPaymentStatus(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/products/all`, httpOptions);
  }

  getFarmerAllocationAccruals(farmerId: any, paymentStatus: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/allocations/farmer/accruals?farmerId=` + farmerId + `&paymentStatus=` + paymentStatus, httpOptions);
  }

  getFarmerPayments(farmerId: any, paymentStatus: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/amount?farmerNo=` + farmerId + `&paymentFlag=` + paymentStatus, httpOptions);
  }


  getFarmersPaymentRecords(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/payments/records`, httpOptions);
  }

  fetchSalesPersons(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/admin/api/v1/users/users-by-role-name?roleName=SALES_PERSON`, httpOptions);
  }

  addMilkAllocation(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/v1/milk_allocation/add`, data, httpOptions);
  }

  fetchMilkAllocations(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/milk_allocation/fetch/allocations`, httpOptions)
  }

  deleteCustomer(id: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/v1/milk_allocation/delete?allocationId=${id}`, httpOptions)
  }
  

}
