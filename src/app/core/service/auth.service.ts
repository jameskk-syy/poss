import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, map, Observable, of } from "rxjs";
import { User } from "../models/user";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  
 PASSWORD_RESET_API = `${environment.apiUrl}/api/v1/reset/`;
 USERS_API = `${environment.apiUrl}/admin/api/v1/users/`;
 AUTH_API = `${environment.apiUrl}/api/v1/auth`;

 httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // login(user): Observable<any> {
  //   const authUrl = `${this.AUTH_API}/login`
  //   return this.http.post<any>(authUrl, user);
  // }

  login(user): Observable<any> {
    const authUrl = `${this.AUTH_API}/login`;
  
    return this.http.post<any>(authUrl, user).pipe(
      map((response) => {
        if (response && response.token) {
          localStorage.setItem('jwtToken', response.token);
          
          const user = { ...response.user, token: response.token };
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
  
        return response; 
      })
    );
  }
  

  resetPasswordRequest(email: any): Observable<any> {
    return this.http.post(this.PASSWORD_RESET_API + `send-token?emailaddress=${email}`, this.httpOptions);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(this.PASSWORD_RESET_API + 'change-password', data, this.httpOptions);
  }

  registerUser(data: any): Observable<any> {
    return this.http.post(this.USERS_API + 'signup', data, this.httpOptions);
  }

  allUsers(): Observable<any> {
    return this.http.get(this.USERS_API + 'all-accounts', this.httpOptions);
  }

  allActiveUsers(): Observable<any> {
    return this.http.get(this.USERS_API + 'active-accounts', this.httpOptions);
  }

  allDeletedUserAccounts(): Observable<any> {
    return this.http.get(this.USERS_API + 'deleted-accounts', this.httpOptions);
  }

  allLockedUserAccounts(): Observable<any> {
    return this.http.get(this.USERS_API + 'locked-accounts', this.httpOptions);
  }

  allInactiveUserAccounts(): Observable<any> {
    return this.http.get(this.USERS_API + 'inactiveaccounts', this.httpOptions);
  }

  getUserByUsername(username: any): Observable<any> {
    return this.http.get(this.AUTH_API + `account/${username}`, this.httpOptions);
  }

  getUserById(id: any): Observable<any> {
    return this.http.get(this.USERS_API + `find/${id}`, this.httpOptions);
  }

  getUsersInOneDepartment(name: any): Observable<any> {
    return this.http.get(this.USERS_API + `department/users?department=${name}`, this.httpOptions);
  }

  updateUser(data: any): Observable<any> {
    return this.http.put(this.USERS_API + 'update', data, this.httpOptions);
  }

  delete(data: any): Observable<any> {
    return this.http.put(this.USERS_API + `deleteaccount?username=${data}`, data, this.httpOptions);
  }

  restoreAccount(data: any): Observable<any> {
    return this.http.put(this.USERS_API + `restoreaccount?username=${data}`, data, this.httpOptions);
  }

  lock(data: any): Observable<any> {
    return this.http.put(this.USERS_API + `lockaccount?username=${data}`, data, this.httpOptions);
  }

  unlock(data: any): Observable<any> {
    return this.http.put(this.USERS_API + `unlockaccount?username=${data}`, this.httpOptions);
  }

  signout(id: any) {
    sessionStorage.clear();
    return this.http.put(this.AUTH_API + `logout/${id}`, this.httpOptions);
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  bulkUploadUsers(data: any): Observable<any> {
    return this.http.post(this.USERS_API + 'upload/bulk/users', data, this.httpOptions);
  }

  bulkUsers(): Observable<any> {
    return this.http.get(this.USERS_API + 'uploaded/users', this.httpOptions);
  }

  initiateBulkRegistration(): Observable<any> {
    return this.http.post(this.USERS_API + 'registration/initiate', this.httpOptions);
  }

  public deleteUser(username): Observable<{ message: string }> {
    const deleteUrl = `${environment.apiUrl}/api/v1/users/deleteaccount`;
    return this.http.put<{ message: string }>(deleteUrl, username);
  }

  public restoreDeletedAccount(username): Observable<{ message: string }> {
    const restoreDeletedaccountUrl = `${environment.apiUrl}/api/v1/users/restoreaccount`;
    return this.http.put<{ message: string }>(
      restoreDeletedaccountUrl,
      username
    );
  }


  public updateDepartment(userDetails): Observable<{ message: string }> {
    const updateDepartmentsUrl = `${environment.apiUrl}/p2p/users/updatedepartment`;
    return this.http.put<{ message: string }>(
      updateDepartmentsUrl,
      userDetails
    );
  }

  public updateUserPassword(passwordDetails): Observable<{ message: string }> {
    const updateUserPasswordUrl = `${environment.apiUrl}/api/v1/users/updatepassword`;
    return this.http.put<{ message: string }>(
      updateUserPasswordUrl,
      passwordDetails
    );
  }

  public updateFirstTimePassword(passwordDetails): Observable<{ message: string }> {
    const updateUserPasswordUrl = `${environment.apiUrl}/ebm/auth/resetpassword`;
    return this.http.put<{ message: string }>(
      updateUserPasswordUrl,
      passwordDetails
    );
  }

  public getAccountLogs(username): Observable<any> {
    const accountLogsUrl = `${environment.apiUrl}/p2p/audit/alllogs/${username}`;
    return this.http.get<any>(accountLogsUrl);
  }

  public getDailyAccountLogs(uname, stime): Observable<any> {
    const dailyAccountLogsUrl = `${environment.apiUrl}/p2p/audit/todaylogs`;
    return this.http.get<any>(dailyAccountLogsUrl, {
      params: { uname, stime },
    });
  }

  public updateUserDepartment(user): Observable<{ message: string }> {
    const updateUserUrl = `${environment.apiUrl}/api/v1/users/updatedepartment`;
    return this.http.put<{ message: string }>(updateUserUrl, user);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }


  usersTemplateDownload(): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.apiUrl}/api/attendees/download/user-template`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }
}
