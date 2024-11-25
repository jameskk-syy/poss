import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, map, Observable, of } from "rxjs";
import { User } from "../models/user";
import { environment } from "src/environments/environment";

const PASSWORD_RESET_API = `${environment.apiUrl}/api/v1/reset/`;
const USERS_API = `${environment.apiUrl}/admin/api/v1/users/`;
const AUTH_API = `${environment.apiUrl}/api/v1/auth/`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(user): Observable<any> {
    const authUrl = `${environment.apiUrl}/api/v1/auth/login`
    return this.http.post<any>(authUrl, user);
  }

  resetPasswordRequest(email: any): Observable<any> {
    return this.http.post(PASSWORD_RESET_API + `send-token?emailaddress=${email}`, httpOptions);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(PASSWORD_RESET_API + 'change-password', data, httpOptions);
  }

  registerUser(data: any): Observable<any> {
    return this.http.post(USERS_API + 'signup', data, httpOptions);
  }

  allUsers(): Observable<any> {
    return this.http.get(USERS_API + 'all-accounts', httpOptions);
  }

  allActiveUsers(): Observable<any> {
    return this.http.get(USERS_API + 'active-accounts', httpOptions);
  }

  allDeletedUserAccounts(): Observable<any> {
    return this.http.get(USERS_API + 'deleted-accounts', httpOptions);
  }

  allLockedUserAccounts(): Observable<any> {
    return this.http.get(USERS_API + 'locked-accounts', httpOptions);
  }

  allInactiveUserAccounts(): Observable<any> {
    return this.http.get(USERS_API + 'inactiveaccounts', httpOptions);
  }

  getUserByUsername(username: any): Observable<any> {
    return this.http.get(AUTH_API + `account/${username}`, httpOptions);
  }

  getUserById(id: any): Observable<any> {
    return this.http.get(USERS_API + `find/${id}`, httpOptions);
  }

  getUsersInOneDepartment(name: any): Observable<any> {
    return this.http.get(USERS_API + `department/users?department=${name}`, httpOptions);
  }

  updateUser(data: any): Observable<any> {
    return this.http.put(USERS_API + 'update', data, httpOptions);
  }

  delete(data: any): Observable<any> {
    return this.http.put(USERS_API + `deleteaccount?username=${data}`, data, httpOptions);
  }

  restoreAccount(data: any): Observable<any> {
    return this.http.put(USERS_API + `restoreaccount?username=${data}`, data, httpOptions);
  }

  lock(data: any): Observable<any> {
    return this.http.put(USERS_API + `lockaccount?username=${data}`, data, httpOptions);
  }

  unlock(data: any): Observable<any> {
    return this.http.put(USERS_API + `unlockaccount?username=${data}`, httpOptions);
  }

  signout(id: any) {
    sessionStorage.clear();
    return this.http.put(AUTH_API + `logout/${id}`, httpOptions);
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  bulkUploadUsers(data: any): Observable<any> {
    return this.http.post(USERS_API + 'upload/bulk/users', data, httpOptions);
  }

  bulkUsers(): Observable<any> {
    return this.http.get(USERS_API + 'uploaded/users', httpOptions);
  }

  initiateBulkRegistration(): Observable<any> {
    return this.http.post(USERS_API + 'registration/initiate', httpOptions);
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
