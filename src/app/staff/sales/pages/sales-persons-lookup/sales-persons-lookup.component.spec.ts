import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPersonsLookupComponent } from './sales-persons-lookup.component';

describe('SalesPersonsLookupComponent', () => {
  let component: SalesPersonsLookupComponent;
  let fixture: ComponentFixture<SalesPersonsLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesPersonsLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPersonsLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
