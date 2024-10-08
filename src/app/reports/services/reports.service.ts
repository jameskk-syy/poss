import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDate } from 'src/app/data/services/utils';


@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  collectionsCountPerDayPerMonth(month: any, year: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/pdf");
  
    let requestOptions: any = {
      params: {
        month: month,
        year: year
      },
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
  
    let API_URL = `${environment.apiUrl}/api/v1/reports/total-collections/per-day/for-month`;
    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        return {
          filename:month + "DetailedDailyCollectionsPerMonth",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );  }
  dailyRouteCollectionsByDate(date: any):Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/pdf");
  
    let requestOptions: any = {
      params: {
        date: formatDate(date,''),
      },
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
  
    let API_URL = `${environment.apiUrl}/api/v1/reports/totalCollections/perDate`;
  
    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        return {
          filename: "CollectionPerRoutePerDate",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );   
   }
  collectionsPerDayPerMonth(month: any, year: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/pdf");
  
    let requestOptions: any = {
      params: {
        month: month,
        year: year
      },
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
  
    let API_URL = `${environment.apiUrl}/api/v1/reports/detailed-total-collections/per-day/for-month`;
    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        return {
          filename:month + "DetailedDailyCollectionsPerMonth",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );  }
  collectionsPerFarmerPerDatePerRoute(month: any, route: any):Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/pdf");
  
    let requestOptions: any = {
      params: {
        month: month,
        route: route
      },
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
  
    let API_URL = `${environment.apiUrl}/api/v1/reports/collections/route/month`;
  
    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        return {
          filename: route+'_'+month+".pdf",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );  
  }

  getMpesaPaymentFile(month: string):Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/pdf");

    let requestOptions: any = {
      params: month, 
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.apiUrl}/api/v1/reports/MpesaPaymentFile?month=`+month;
    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log(response)
        return {
          filename: month + "MpesaPaymentFile",
          data: new Blob([response], { type: "application/pdf" }),

        };
      })
    ); 
  }

  dailyRouteSummaryPerMonth(route: any, month: string, year: any):Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/pdf");

    let requestOptions: any = {
      params: month, 
      headers: headers,
      responseType: "blob",
      withCredentials: false,
      observe: "response" as "body"
    };
    let API_URL = `${environment.apiUrl}/api/v1/reports/route/month-daily/${route}/${month}/${year}`;
    return this.http.get(API_URL, requestOptions).pipe(
      map((res: any) => {
                // get filename from disposition header
                console.log("data us sss")
                const contentDisposition = res.headers.get('Content-Disposition');
        
                let filename = month+'-'+year+'.pdf';
        
                if (contentDisposition) {
                  const matches = /filename=([^;]+)/.exec(contentDisposition)
                  if (matches != null && matches[1]) {
                    filename = matches[1].trim()
                  }
                }
        
                return {
                  filename: filename,
                  data: new Blob([res.body], {type: "application/pdf"})
                }
      })
    ); 
  }

  getPayroll(month: any, year: any, bank: any):Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    let API_URL = `${environment.apiUrl}/api/v1/excel/reports/payroll/${month}/${year}/${bank}`;
    console.log("Calling api " + API_URL)

    return this.http.get(API_URL, { headers, responseType: 'blob' });
   }

   getFullExcelPayroll(month: any, year: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    headers.append("Content-Type", "blob")

    return this.http.get(`${environment.apiUrl}/api/v1/excel/reports/month/payroll/${month}/${year}`, {headers, responseType: 'blob'});
   }


   getFullPdfPayroll(month: any, year: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/pdf");

    let httpOptions: any = {
      params: {},
      headers: headers,
      responseType: "blob",
      withCredentials: false,
      observe: 'response' as 'body'
    }

    return this.http.get(`${environment.apiUrl}/api/v1/reports/month/payroll/${month}/${year}`, httpOptions).pipe(
      map((res: any) => {
        // get filename from disposition header
        console.log("data us sss")
        const contentDisposition = res.headers.get('Content-Disposition');

        let filename = month+'-'+year+'.pdf';

        if (contentDisposition) {
          const matches = /filename=([^;]+)/.exec(contentDisposition)
          if (matches != null && matches[1]) {
            filename = matches[1].trim()
          }
        }

        return {
          filename: filename,
          data: new Blob([res.body], {type: "application/pdf"})
        }
      }
    ))
   }

   getPayrollByMode(month: any, year: any, bank: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/pdf");

    let reqOptions: any = {
      params: {},
      headers: headers,
      responseType: "blob",
      withCredentials: false,
      observe: "response" as 'body'
    }

    return this.http.get(`${environment.apiUrl}/api/v1/reports/payroll/${month}/${year}/${bank}`, reqOptions).pipe(
      map((res: any) => {

        // get filename from content dispostion header.
        const contentDisposition = res.headers.get('Content-Disposition')
        let filename = bank+"-payroll.pdf";

        if (contentDisposition) {
          const matches = /filename=([^;]+)/.exec(contentDisposition)
          if (matches != null && matches[1]) {
            filename = matches[1].trim()
          }
        }
        
        return {
          filename: filename,
          data: new Blob([res.body], {type: "application/pdf"})
        }
      })
    )
   }

  baseUrl: string;

monthlyRouteSummary(year: string, month: string): Observable<any> {
  let headers = new HttpHeaders();
  headers.append("Content-Type", "application/pdf");

  let requestOptions: any = {
    params: {},
    headers: headers,
    responseType: "blob",
    withCredentials: false,
  };

  let API_URL = `${environment.apiUrl}/api/v1/reports/monthly/route/session/${month}/${year}`;
  return this.http.get(API_URL, requestOptions).pipe(
    map((response) => {
      return {
        filename:month + "monthlyRouteSummary",
        data: new Blob([response], { type: "application/pdf" }),
      };
    })
  );
  }
  headers = new HttpHeaders().set('Content-Type', 'application/pdf');
  constructor(private http: HttpClient) { }



  generatefarmerCollections(farmerNo: any, farmerName: any,from: any, to: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: {farmerNo, from, to, farmerName},
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.apiUrl}/api/v1/reports/farmer/collections`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        return {
          filename: "FarmerCollections",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  generatefarmerProducts(farmerN0: any, month: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: farmerN0, month,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.apiUrl}/api/v1/reports/farmer/product/allocations?farmer_no=` + farmerN0 + `&month=` + month;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        return {
          filename: "FarmerCollections",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  generatefarmerStatement(farmerNo: any, from: any, to: any): Observable<any> {
    console.log("Calling api  ....")
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: farmerNo, from, to,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.apiUrl}/api/v1/reports/farmer/statement?farmerNo=` + farmerNo + `&from=` + from + `&to=` + to;
    console.log("API== " + API_URL)

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        return {
          filename: "FarmerStatement",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  collectionsPerDate(date: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: date,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.apiUrl}/api/v1/reports/collections/per-date?date=` + date;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        return {
          filename: "CollectionsPerDate",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  collectionsPerDateExcel(date: string): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    let API_URL = `${environment.apiUrl}/api/v1/excel/reports/collectionsPerDate?date=` + date;
    console.log("Calling api " + API_URL)

    return this.http.get(API_URL, { headers, responseType: 'blob' });
  }
  collectionsPerMCCandDateExcel(pid:any,date: string): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    let API_URL = `${environment.apiUrl}/api/v1/excel/reports/collections/pickuplocation?pid=`+pid+`&date=` + date;
    console.log("Calling api " + API_URL)

    return this.http.get(API_URL, { headers, responseType: 'blob' });
  }


  dailyRouteSummary(date: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/pdf");
  
    let requestOptions: any = {
      params: {
        date: formatDate(date,''),
      },
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
  
    let API_URL = `${environment.apiUrl}/api/v1/reports/daily/route/session/${date}`;
  
    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        return {
          filename: "dailyRouteSummary",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  
  // collectionsPerPulByDate(locationId: any, date: any): Observable<any> {
  //   let headers = new HttpHeaders();
  //   headers.append("Accept", "application/pdf");

  //   let requestOptions: any = {
  //     params: locationId, date,
  //     headers: headers,
  //     responseType: "blob",
  //     withCredentials: false,
  //   };
  //   let API_URL = `${environment.apiUrl}/api/v1/reports/collections/per/pickUpLocation?pickUpLocationId=` + locationId + `&date=` + date;

  //   console.log("Calling api == " + API_URL)

  //   return this.http.get(API_URL, requestOptions).pipe(
  //     map((response) => {
  //       return {
  //         filename: "CollectionsPerCollectors",
  //         data: new Blob([response], { type: "application/pdf" }),
  //       };
  //     })
  //   );
  // }


  collectionsPerRouteByDate(date: any, route:any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/pdf");
  
    let requestOptions: any = {
      params: {
        date: formatDate(date,''),
        route: route
      },
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
  
    let API_URL = `${environment.apiUrl}/api/v1/reports/collections/per-route-and-date`;
  
    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        return {
          filename: "CollectionForRoutePerDate",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );  
  }
  // collectionsPerLocationrByDatep(date: any): Observable<any> {
  //   let headers = new HttpHeaders();
  //   headers.append("Accept", "application/pdf");

  //   let requestOptions: any = {
  //     params: date,
  //     headers: headers,
  //     responseType: "blob",
  //     withCredentials: false,
  //   };
  //   let API_URL = `${environment.apiUrl}/api/v1/reports/collections/pickuplocations/date?date=` + date;

  //   return this.http.get(API_URL, requestOptions).pipe(
  //     map((response) => {
  //       return {
  //         filename: "TotalCollectionsPerLocation",
  //         data: new Blob([response], { type: "application/pdf" }),
  //       };
  //     })
  //   );
  // }
  collectionsPerRouteByMonth(month: any, year: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/pdf");
  
    let requestOptions: any = {
      params: {
        month: month,
        year: year
      },
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
  
    let API_URL = `${environment.apiUrl}/api/v1/reports/totalCollections/perRoute/perMonth`;
    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        return {
          filename:month + "CollectionsPerRoutePerMonth",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  // getPaymentFile(locationId:any,month: any, mode: any): Observable<any> {
  //   console.log("..Calling api  ....")
  //   let headers = new HttpHeaders();
  //   headers.append("Accept", "application/pdf");

  //   let requestOptions: any = {
  //     params: month, mode,
  //     headers: headers,
  //     responseType: "blob",
  //     withCredentials: false,
  //   };
  //   let API_URL = `${environment.apiUrl}/api/v1/reports/paymentfile?pickupLocationId=`+locationId+`&month=` + month + `&paymentMode=` + mode;
  //   console.log("Calling api"+ API_URL)

  //   return this.http.get(API_URL, requestOptions).pipe(
  //     map((response) => {
  //       return {
  //         filename: month + "-PaymentFile",
  //         data: new Blob([response], { type: "application/pdf" }),
  //       };
  //     })
  //   );
  // }

}
