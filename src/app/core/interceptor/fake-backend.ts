import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap } from "rxjs/operators";

// Company Interface
interface Company {
  id: number;
  name: string;
  address: string;
  phone: string;
  kraPin: string;
  email: string;
  dealerName: string;
  dealCompany: string;
}

// Department Interface (only name required)
interface Department {
  id: number;
  name: string;
}

// Initialize single company and departments
let company: Company | null = null;
let departments: Department[] = []; // Store only names of departments

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, body } = request;
    return of(null).pipe(mergeMap(handleRoute), delay(500)); // Simulate latency

    function handleRoute() {
      switch (true) {
        // Company routes
        case url.endsWith("/api/v1/company/get") && method === "GET":
          return getCompany();
        case url.endsWith("/api/v1/company/update") && method === "PUT":
          return updateCompany();
        case url.endsWith("/api/v1/company/add") && method === "POST":
          return addCompany();

        // Department routes
        case url.endsWith("/api/v1/department/get") && method === "GET":
          return getDepartments();
        case url.endsWith("/api/v1/department/add") && method === "POST":
          return addDepartment();
        case url.match(/\/api\/v1\/department\/delete\/\d+$/) && method === "DELETE":
          return deleteDepartment();

        default:
          return next.handle(request);
      }
    }

    // Route Functions - Company

    function getCompany() {
      if (!company) return error("Company not found");
      return ok(company);
    }

    function addCompany() {
      company = { id: 1, ...body };
      return ok(company);
    }

    function updateCompany() {
      if (!company) return error("Company not found");
      company = { ...company, ...body };
      return ok(company);
    }

    // Route Functions - Department

    function getDepartments() {
      return ok(departments);
    }

    function addDepartment() {
      const newDepartment: Department = {
        id: departments.length + 1,
        name: body.name, // Only name is stored
      };
      departments.push(newDepartment);
      return ok(newDepartment);
    }

    function deleteDepartment() {
      const id = getIdFromUrl();
      departments = departments.filter((dept) => dept.id !== id);
      return ok();
    }

    // Helper Functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message: string) {
      return throwError({ error: { message } });
    }

    function getIdFromUrl() {
      const urlParts = url.split("/");
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
