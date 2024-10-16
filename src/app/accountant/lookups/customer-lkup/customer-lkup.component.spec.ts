import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLkupComponent } from './customer-lkup.component';

describe('CustomerLkupComponent', () => {
  let component: CustomerLkupComponent;
  let fixture: ComponentFixture<CustomerLkupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerLkupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLkupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
