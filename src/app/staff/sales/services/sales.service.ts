import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class SalesService {
  deleteTotalsCollections(id: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/v1/accumulation/delete/`+id, httpOptions)
  }
  updateTotalsCollections(data: any) {
    return this.http.put(`${environment.apiUrl}/api/v1/accumulation/update/record`, data, httpOptions); 
   }
  getTotalsCollectionByDate(date: any):Observable<any> {
    var resp = this.http.get(`${environment.apiUrl}/api/v1/accumulation/get/date?date=` + date, httpOptions);
    console.log("data: "+resp)
    return resp;
  }
 

  
  private eventSource = new Subject<any>();
  event$ = this.eventSource.asObservable();
  baseUrl: any;

  emitEvent(event: any) {
    this.eventSource.next(event);
  }
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  getAllAccumulatorNames(roleName:string): Observable<any> {
    // return this.http.get(`${environment.apiUrl}/api/v1/users/users-by-role-name?roleName/${roleName}`, httpOptions);
    return this.http.get(`${environment.apiUrl}/admin/api/v1/users/users-by-role-name?roleName=` + roleName, httpOptions);


  }
 

  getAllRouteNames():Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/routes/fetch`,httpOptions); 
  }

  getAllCollectorByNames(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/collectors/all`,httpOptions); 
  }
  addAccumulation(value: any):Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/v1/accumulation/add`,
    {
     collectorId:value.collectorId,
      milkQuantity:value.milkQuantity,
      session: value.session,
      accumulatorId:value.accumulatorId,
      routeFk: value.routeFk,
    },httpOptions); 
  }
  
  // getAccumulationsPerDate(collectorId: number, date: string): Observable<any> {
  //   const url = `${environment.apiUrl}/accumulation/${collectorId}/${date}`;
  //   return this.http.get(url);
  // }
  getCollectorsIdAccumulations(collectorId: any): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/accumulation/${collectorId}`;
    return this.http.get(url, httpOptions);
  }


  getAllAccumulations(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/accumulation/all`,httpOptions); 
   }
 
  getAccumulationsByAccumulatorId(accumulatorId: any, date: any): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/accumulation/by-accumulator/${accumulatorId}/${date}`;
    return this.http.get(url);
  }

  getAdvance(data:any):Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/advance-payments/all`,httpOptions);


   }

  // getFarmerByFarmerNo(farmerNo: string): Observable<any> {
  //   const apiUrl = `http://52.15.152.26:9701/api/v1/advance-payments/get-by-farmer-number/${farmerNo}`;
  //   return this.http.get(apiUrl);
  // }
  getFarmerByFarmerNo(farmerNo: string):Observable<any>{
    return this.http.get(`${environment.apiUrl}/api/v1/advance-payments/get-by-farmer-number/${farmerNo}`, httpOptions);

  }
  allocateAdvance(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/v1/advance-payments/add`,
    {
      farmerNo: data.farmerNo,
      date: data.date,
      advanceAmount: data.advanceAmount,
      paymentMode: data.paymentMode,
      username: data.username
    },httpOptions);
   }

  
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
    return this.http.get(`${environment.apiUrl}/api/v1/collections/per/farmer/by-farmer-no?farmerNo=` +id,httpOptions);
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
  

  getFarmerCollections(farmerid) {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/all`,httpOptions);
  }   
  
  getFarmerNoCollections(farmer_no: any):Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/per/farmer/by-farmer-no?farmerNo=${farmer_no}`,httpOptions);
    // return this.http.get(`${environment.apiUrl}/api/v1/collections/per/farmer/by-farmer-no?farmerNo=` +farmer_no,httpOptions);


  }

  getFarmerDetails(farmer_no: any): Observable<any> {
    // return this.http.get(`${environment.apiUrl}/api/v1/farmer/farmers/details?farmerId=` + id, httpOptions);
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/membernumber?farmer_number=` + farmer_no, httpOptions);

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

  deleteCollections(id: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/v1/collections/delete/`+id, httpOptions)
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

  getApprovedPaymentRecords(staffId: any):Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/payments/records/approved?staffId=${staffId}`, httpOptions);
  }

  getFarmersPaymentRecords(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/payments/records`, httpOptions);
  }
  getFarmersPaymentRecordsPerRoute(routeId:number,staffId?:any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/payments/records/route?routeId=${routeId}${staffId?'&staffId='+staffId:''}`, httpOptions);
  }
  updateApprovalStatus(confirmedRecords: any[],routeId:any,staffId:any):Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/v1/payments/records/update/route?routeId=${routeId}&staffId=${staffId}`,confirmedRecords, httpOptions);
  }

  initiatePayment(entity: any):Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/v1/payments/records/initiate`,entity, httpOptions);
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

  deleteAllocation(id: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/v1/milk_allocation/delete?allocationId=${id}`, httpOptions)
  }
  
  // getAdvance(data:any):Observable<any> {
  //   return this.http.get(`${environment.apiUrl}/api/v1/advance-payments/all`,httpOptions);


  //  }

  // getFarmerByFarmerNo(farmerNo: string): Observable<any> {
  //   const apiUrl = `${environment.apiUrl}/api/v1/advance-payments/get-by-farmer-number/${farmerNo}`;
  //   return this.http.get(apiUrl);
  // }
  // allocateAdvance(data: any): Observable<any> {
  //   return this.http.post(`${environment.apiUrl}/api/v1/advance-payments/add`,
  //   {
  //     farmerNo: data.farmerNo,
  //     date: data.date,
  //     advanceAmount: data.advanceAmount,
  //     paymentMode: data.paymentMode,
  //     username: data.username
  //   },httpOptions);
  //  }
}
