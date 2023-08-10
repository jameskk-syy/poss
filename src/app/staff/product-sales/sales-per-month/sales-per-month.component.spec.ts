import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPerMonthComponent } from './sales-per-month.component';

describe('SalesPerMonthComponent', () => {
  let component: SalesPerMonthComponent;
  let fixture: ComponentFixture<SalesPerMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesPerMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
