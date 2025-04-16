import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

 

 

 
  constructor(private http: HttpClient) {}

  deptsUrl = `${environment.apiUrl}/api/v1/department/`;
  usersUrl = `${environment.apiUrl}/api/action-items/user/analytics/`;



  private getHttpOptions() {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return { headers };
  }

  getHttps() {
    const token = localStorage.getItem('token'); // Or the correct way you store the token
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  //
 // private getHtt() {
  //   const token = localStorage.getItem('token'); 
  //   // let headers = new HttpHeaders({
  //   //   'Content-Type': 'multipart/form-data',
  //   //   'Accept': '*/*', 
  //   // });

  //   if (token) {
  //     headers = headers.set('Authorization', `Bearer ${token}`);
  //   }

  //   return { headers };
  // }


  // //
  // createItem(data: any): Observable<any> {
  //   const API_URL = `${environment.apiUrl}/api/v1/items`;
  //   return this.http.post(API_URL, data, this.getHtt()).pipe(
  //     map(res => res || {})
  //   );
  // }

  makeMpesaPayment(data:any):Observable<any> {
    const url = `${environment.mpesaUrl}/initiate-payment`;
    return this.http
      .post(url,data, this.getHttpOptions())
      .pipe(map((res) => res || []));
  }
  addSale(value: any,id:any): Observable<any> {
    const API_URL = `${environment.apiUrl}/api/V1/sales/sell/${id}?soldBy='gathiru'`;
    return this.http.post(API_URL, value, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        // Content-Type should NOT be set explicitly for multipart/form-data
      }),
    }).pipe(
      map((res) => res || {}),
      catchError((error) => {
        console.error('Error creating item:', error);
        return throwError(() => new Error(error.message || 'Failed to create item'));
})
);
  }
  addStore(data:any): Observable<any> {
    const API_URL = `${environment.apiUrl}/api/V1/stores/add/store?postedBy='gathiru'`;
    return this.http.post(API_URL, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        // Content-Type should NOT be set explicitly for multipart/form-data
      }),
    }).pipe(
      map((res) => res || {}),
      catchError((error) => {
        console.error('Error creating item:', error);
        return throwError(() => new Error(error.message || 'Failed to create item'));
})
);
  }
  addClient(value: any): Observable<any> {
    const API_URL = `${environment.apiUrl}/api/V1/clients/add-client?postedBy='gathiru'`;
    return this.http.post(API_URL, value, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        // Content-Type should NOT be set explicitly for multipart/form-data
      }),
    }).pipe(
      map((res) => res || {}),
      catchError((error) => {
        console.error('Error creating item:', error);
        return throwError(() => new Error(error.message || 'Failed to create item'));
})
);
  }
  addUser(value: any): Observable<any> {
    const API_URL = `${environment.apiUrl}/register`;
    return this.http.post(API_URL, value, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        // Content-Type should NOT be set explicitly for multipart/form-data
      }),
    }).pipe(
      map((res) => res || {}),
      catchError((error) => {
        console.error('Error creating item:', error);
        return throwError(() => new Error(error.message || 'Failed to create item'));
})
);
  }
  addStock //   'Content-Type': 'multipart/form-data',
  (value: any) : Observable<any> {
    const API_URL = `${environment.apiUrl}/api/V1/stocks/add-stock?postedBy='gathiru'`;
    return this.http.post(API_URL, value, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        // Content-Type should NOT be set explicitly for multipart/form-data
      }),
    }).pipe(
      map((res) => res || {}),
      catchError((error) => {
        console.error('Error creating item:', error);
        return throwError(() => new Error(error.message || 'Failed to create item'));
})
);
  }

  createItem(data: any): Observable<any> {
    const API_URL = `${environment.apiUrl}/api/V1/items/add-item?postedBy='gathiru'`;
    return this.http.post(API_URL, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        // Content-Type should NOT be set explicitly for multipart/form-data
      }),
    }).pipe(
      map((res) => res || {}),
      catchError((error) => {
        console.error('Error creating item:', error);
        return throwError(() => new Error(error.message || 'Failed to create item'));
})
);
  }


  updateItems(id: number, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/v1/items/${id}`, data, this.getHttpOptions());
  }


  public getAllProducts(): Observable<any> {
    const url = `${environment.apiUrl}/api/V1/items/all-items`;
    return this.http
      .get(url, this.getHttpOptions())
      .pipe(map((res) => res || []));
  }
  public getAllPurchases(): Observable<any> {
    const url = `${environment.apiUrl}/api/V1/items/all-items`;
    return this.http
      .get(url, this.getHttpOptions())
      .pipe(map((res) => res || []));
  }

  // addExpense(data: any): Observable<any> {
  //   const API_URL = `${environment.apiUrl}/api/expenses`;
  //   return this.http.post(API_URL, data, this.getHttpOptions()).pipe(
  //     map(res => res || {})
  //   );
  // }

  public getExpenses(): Observable<any> {
    const url = `${environment.apiUrl}/api/expenses`;
    return this.http
      .get(url, this.getHttpOptions())
      .pipe(map((res) => res || []));
  }

  // addExpense(data: any): Observable<any> {
  //   const API_URL = `${environment.apiUrl}/api/expenses`;
  //   return this.http.post(API_URL, data, this.getHttpOptions()).pipe(
  //     map(res => res || {})
  //   );
  // }

  // public getExpenses(): Observable<any> {
  //   const url = `${environment.apiUrl}/api/expenses`;
  //   return this.http
  //     .get(url, this.getHttpOptions())
  //     .pipe(map((res) => res || []));
  // }
  public getAllSales(): Observable<any> {
    const url = `${environment.apiUrl}/api/sale-orders`;
    return this.http
      .get(url, this.getHttpOptions())
      .pipe(map((res) => res || []));
  }

  getSaleById(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/sale-orders${id}`);
  }
  createBranch(data: any): Observable<any> {
    console.log('Sending data to API:', data); // Debugging

    const API_URL = `${environment.apiUrl}/api/branches`;

    return this.http.post<any>(API_URL, data, this.getHttpOptions()).pipe(
      map((response) => {
        console.log('Branch created successfully:', response); // Debugging
        return response;
      }),
      catchError((error) => {
        console.error('Error creating branch:', error);
        return throwError(
          () => new Error(error.message || 'Failed to create branch')
        );
      })
    );
  }
  createprs(data: any): Observable<any> {
    console.log('Sending data to API:', data); // Debugging

    const API_URL = `${environment.apiUrl}/api/branches`;

    return this.http.post<any>(API_URL, data, this.getHttpOptions()).pipe(
      map((response) => {
        console.log('Branch created successfully:', response); // Debugging
        return response;
      }),
      catchError((error) => {
        console.error('Error creating branch:', error);
        return throwError(
          () => new Error(error.message || 'Failed to create branch')
        );
      })
    );
  }

  getAllBranches(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/api/branches`, this.getHttpOptions())
      .pipe(
        map((response) => response || []),
        catchError((error) => {
          console.error('Error fetching branches:', error);
          return throwError(
            () => new Error(error.message || 'Failed to fetch branches')
          );
        })
      );
  }
  updateBranchs(id: number, data: any): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/api/branches/${id}`,
      data,
      this.getHttpOptions()
    );
  }
  deleteBranchs(id: number): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}/api/branches/${id}`,
      this.getHttpOptions()
    );
  }

  createSupplier(data: any): Observable<any> {
    console.log('Sending data to API:', data); // Debugging

    const API_URL = `${environment.apiUrl}/api/suppliers`;

    return this.http.post<any>(API_URL, data, this.getHttpOptions()).pipe(
      map((response) => {
        console.log('Supplier created successfully:', response); // Debugging
        return response;
      }),
      catchError((error) => {
        console.error('Error creating Supplier:', error);
        return throwError(
          () => new Error(error.message || 'Failed to create Supplier')
        );
      })
    );
  }

  getAllSuppliers(): Observable<any[]> {
    return this.http
      .get<any[]>(`${environment.apiUrl}/api/suppliers`, this.getHttpOptions())
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response; // Return the array directly
          } else {
            console.error('Unexpected API response:', response);
            return []; // Return an empty array to prevent crashes
          }
        }),
        catchError((error) => {
          console.error('Error fetching suppliers:', error);
          return throwError(() => new Error('Failed to fetch suppliers'));
        })
      );
  }

  updateSuppliers(id: number, data: any): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/api/suppliers/${id}`,
      data,
      this.getHttpOptions()
    );
  }
  deleteSuppliers(id: number): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}/api/suppliers/${id}`,
      this.getHttpOptions()
    );
  }

  createSale(data: any): Observable<any> {
    const API_URL = `${environment.apiUrl}/api/sale-orders`;

    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
    };

    console.log(
      'Sending sale transaction data to API:',
      JSON.stringify(data, null, 2)
    );

    return this.http.post<any>(API_URL, data, httpOptions).pipe(
      map((response) => {
        console.log('Sale transaction created successfully:', response);
        return response;
      }),
      catchError((error) => {
        console.error('Backend error response:', error.error);
        return throwError(
          () => new Error(error.message || 'Failed to create sale transaction')
        );
      })
    );
  }

  createCategory(data: any): Observable<any> {
    console.log('Sending data to API:', data); // Debugging

    const API_URL = `${environment.apiUrl}/api/product-categories`;

    return this.http.post<any>(API_URL, data, this.getHttpOptions()).pipe(
      map((response) => {
        console.log('Category created successfully:', response); // Debugging
        return response;
      }),
      catchError((error) => {
        console.error('Error creating Category:', error);
        return throwError(
          () => new Error(error.message || 'Failed to create Category')
        );
      })
    );
  }
    addExpense(data: any): Observable<any> {
    console.log('Sending data to API:', data); // Debugging

    const API_URL = `${environment.apiUrl}/api/expenses`;

    return this.http.post<any>(API_URL, data, this.getHttpOptions()).pipe(
      map((response) => {
        console.log('Expense created successfully:', response); // Debugging
        return response;
      }),
      catchError((error) => {
        console.error('Error creating Expense:', error);
        return throwError(
          () => new Error(error.message || 'Failed to create Expense')
        );
      })
    );
  }

  createPrc(data: any): Observable<any> {
    const API_URL = `${environment.apiUrl}/api/purchases`;

    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
    };

    console.log(
      'Sending purchase transaction data to API:',
      JSON.stringify(data, null, 2)
    );

    return this.http.post<any>(API_URL, data, httpOptions).pipe(
      map((response) => {
        console.log('purchase transaction created successfully:', response);
        return response;
      }),
      catchError((error) => {
        console.error('Backend error response:', error.error);
        return throwError(
          () =>
            new Error(error.message || 'Failed to create purchase transaction')
        );
      })
    );
  }


  // uploadExcelFile(data: FormData): Observable<any> {
  //   const API_URL = `${environment.apiUrl}/api/items/upload/upload-to-all-branches`;
  
  //   return this.http.post(API_URL, data, {
  //     headers: new HttpHeaders({
  //       Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  //     }),
  //   }).pipe(
  //     map((res) => res || {}),
  //     catchError((error) => {
  //       console.error('Error uploading file:', error);
  //       return throwError(() => new Error(error.message || 'Failed to upload file'));
  //     })
  //   );
  // }

  // In your service file
uploadExcelFile(data: FormData): Observable<any> {
  const API_URL = `${environment.apiUrl}/api/items/upload/upload-to-all-branches`;
  
  // Remove content-type header to let the browser set it with the boundary parameter
  return this.http.post(API_URL, data, {
    headers: new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      // Don't set Content-Type here as it will be set automatically for FormData
    }),
    reportProgress: true, // Optional: for tracking upload progress
  }).pipe(
    map((res) => res || {}),
    catchError((error) => {
      console.error('Error uploading file:', error);
      return throwError(() => new Error(error.message || 'Failed to upload file'));
    })
  );
}
  getAllCategories(): Observable<any> {
    return this.http
      .get(
        `${environment.apiUrl}/api/product-categories`,
        this.getHttpOptions()
      )
      .pipe(
        map((response) => response || []),
        catchError((error) => {
          console.error('Error fetching categories:', error);
          return throwError(
            () => new Error(error.message || 'Failed to fetch Categoryes')
          );
        })
      );
  }

 getReports(startDate: string, endDate: string): void {
  const params = {
    startDate,
    endDate
  };

  this.http
    .get(`${environment.apiUrl}/api/sale-orders/report/pdf`, {
      params,
      ...this.getHttpOptions(), 
      responseType: 'blob' // Important: Set response type to blob
    })
    .subscribe({
      next: (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'sale_order_report.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      error: (error) => {
        console.error('Error downloading report:', error);
        if (error.error instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            const errorData = JSON.parse(reader.result as string);
            alert(errorData.message || "An error occurred while generating the report.");
          };
          reader.readAsText(error.error);
        } else {
          alert("Failed to connect to the server.");
        }
      }
    });
}
purchaseReport(startDate: string, endDate: string): void {
  const params = {
    startDate,
    endDate
  };

  this.http
    .get(`${environment.apiUrl}/api/purchases/purchase-report/pdf`, {
      params,
      ...this.getHttpOptions(), 
      responseType: 'blob' 
    })
    .subscribe({
      next: (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'purchase_report.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      error: (error) => {
        console.error('Error downloading purchase report:', error);
        if (error.error instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            const errorData = JSON.parse(reader.result as string);
            alert(errorData.message || "An error occurred while generating the purchase report.");
          };
          reader.readAsText(error.error);
        } else {
          alert("Failed to connect to the server.");
        }
      }
    });
}

incomeReport(startDate: string, endDate: string): void {
  const params = new HttpParams()
    .set('startDate', startDate)
    .set('endDate', endDate);

  this.http
    .get(`${environment.apiUrl}/api/reports/profit-loss/pdf`, {
      headers: this.getHttpOptions().headers, // Ensure headers are explicitly passed
      params,
      responseType: 'blob'
    })
    .subscribe({
     next: (response: Blob) => {  // Explicitly cast response as Blob
  const blob = new Blob([response], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'P&L_report.pdf'; // Ensure correct file name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
},

      error: (error) => {
        console.error('Error downloading P&L report:', error);
        if (error.error instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            const errorData = JSON.parse(reader.result as string);
            alert(errorData.message || "An error occurred while generating the P$L report.");
          };
          reader.readAsText(error.error);
        } else {
          alert("Failed to connect to the server.");
        }
      }
    });
}
expReports(startDate: string, endDate: string, expenseType: string): void {
  const params = new HttpParams()
    .set('startDate', startDate)
    .set('endDate', endDate)
    .set('expenseType',expenseType);

  this.http
    .get(`${environment.apiUrl}/api/reports/report/expenses/pdf`, {
      headers: this.getHttpOptions().headers, // Ensure headers are explicitly passed
      params,
      responseType: 'blob'
    })
    .subscribe({
     next: (response: Blob) => {  // Explicitly cast response as Blob
  const blob = new Blob([response], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'expense_report.pdf'; // Ensure correct file name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
},

      error: (error) => {
        console.error('Error downloading expense report:', error);
        if (error.error instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            const errorData = JSON.parse(reader.result as string);
            alert(errorData.message || "An error occurred while generating the report.");
          };
          reader.readAsText(error.error);
        } else {
          alert("Failed to connect to the server.");
        }
      }
    });
}


// purchaseReport(startDate: string, endDate: string): void {
//   const params = {
//     startDate,
//     endDate
//   };

//   this.http
//     .get(`${environment.apiUrl}/api/purchases/purchase-report/pdf`, {
//       params,
//       ...this.getHttpOptions(), // Ensure this is included
//       responseType: 'blob' // Important: Set response type to blob
//     })
//     .subscribe({
//       next: (response) => {
//         const blob = new Blob([response], { type: 'application/pdf' });
//         const link = document.createElement('a');
//         link.href = window.URL.createObjectURL(blob);
//         link.download = 'purchases_report.pdf'; // Change the file name to reflect the content
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       },
//       error: (error) => {
//         console.error('Error downloading report:', error);
//         if (error.error instanceof Blob) {
//           const reader = new FileReader();
//           reader.onload = () => {
//             const errorData = JSON.parse(reader.result as string);
//             alert(errorData.message || "An error occurred while generating the report.");
//           };
//           reader.readAsText(error.error);
//         } else {
//           alert("Failed to connect to the server.");
//         }
//       }
//     });
// }
  updateCategories(id: number, data: any): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/api/product-categories/${id}`,
      data,
      this.getHttpOptions()
    );
  }
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}/api/product-categories/${id}`,
      this.getHttpOptions()
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/v1/items/${id}`);
  }

  // CUSTOMER SERVICES

  getAllCustomers(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/api/customers`, this.getHttpOptions())
      .pipe(
        map((response) => response || []),
        catchError((error) => {
          console.error('Error fetching customers:', error);
          return throwError(
            () => new Error(error.message || 'Failed to fetch customers')
          );
        })
      );
  }

  getCustomerById(id: number): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/api/customers/${id}`,
      this.getHttpOptions()
    );
  }
  createCustomer(data: any): Observable<any> {
    console.log('Sending data to Backend:', data); // Debugging

    // return this.http.post(`${environment.apiUrl}/api/customers`, data);
    return this.http
      .post<any>(
        `${environment.apiUrl}/api/customers`,
        data,
        this.getHttpOptions()
      )
      .pipe(
        map((response) => {
          console.log('Customer created successfully:', response); // Debugging
          return response;
        }),
        catchError((error) => {
          console.error('Error creating Customer:', error);
          return throwError(
            () => new Error(error.message || 'Failed to create Customer')
          );
        })
      );
  }

  updateCustomer(id: number, data: any): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/api/customers/${id}`,
      data,
      this.getHttpOptions()
    );
  }
  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}/api/customers/${id}`,
      this.getHttpOptions()
    );
  }
}
