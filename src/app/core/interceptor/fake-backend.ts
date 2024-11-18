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

// Company interface
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

// Department interface (now only requires the 'name' field)
interface Department {
  id: number;
  name: string;
  companyId: number;  // Link to a company
}

// Initialize a single company object (could be empty initially)
let company: Company | null = null;

// Initialize an empty array of departments
let departments: Department[] = [];

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
        // Company-related routes
        case url.endsWith("/api/v1/company/get") && method === "GET":
          return getCompany();
        case url.endsWith("/api/v1/company/add") && method === "POST":
          return addCompany();
        case url.endsWith("/api/v1/company/update") && method === "PUT":
          return updateCompany();

        // Department-related routes
        case url.endsWith("/api/v1/department/get") && method === "GET":
          return getDepartments();
        case url.match(/\/api\/v1\/department\/get\/\d+$/) && method === "GET":
          return getDepartmentById();
        case url.endsWith("/api/v1/department/add") && method === "POST":
          return addDepartment();
        case url.match(/\/api\/v1\/department\/update\/\d+$/) && method === "PUT":
          return updateDepartment();
        case url.match(/\/api\/v1\/department\/delete\/\d+$/) && method === "DELETE":
          return deleteDepartment();

        default:
          return next.handle(request);
      }
    }

    // Company Route Functions
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
      company = { ...company, ...body }; // Merge existing company with updated data
      return ok(company);
    }

    // Department Route Functions
    function getDepartments() {
      return ok(departments);
    }

    function getDepartmentById() {
      const id = getIdFromUrl();
      const department = departments.find((dept) => dept.id === id);
      return department ? ok(department) : error("Department not found");
    }

    function addDepartment() {
      // Only requires 'name' for the department; other fields are optional and not needed
      const newDepartment = { 
        id: departments.length + 1, 
        name: body.name, 
        companyId: body.companyId || 1 // Assuming a default companyId if not provided
      };
      departments.push(newDepartment);
      return ok(newDepartment);
    }

    function updateDepartment() {
      const id = getIdFromUrl();
      const index = departments.findIndex((dept) => dept.id === id);
      if (index === -1) return error("Department not found");
      
      // Only update the 'name' field for the department
      departments[index] = { ...departments[index], name: body.name || departments[index].name };
      return ok(departments[index]);
    }

    function deleteDepartment() {
      const id = getIdFromUrl();
      const index = departments.findIndex((dept) => dept.id === id);
      if (index === -1) return error("Department not found");
      departments.splice(index, 1);  // Delete the department
      return ok({ message: "Department deleted" });
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
