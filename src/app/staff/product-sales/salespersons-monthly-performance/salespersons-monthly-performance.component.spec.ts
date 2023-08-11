import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalespersonsMonthlyPerformanceComponent } from './salespersons-monthly-performance.component';

describe('SalespersonsMonthlyPerformanceComponent', () => {
  let component: SalespersonsMonthlyPerformanceComponent;
  let fixture: ComponentFixture<SalespersonsMonthlyPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalespersonsMonthlyPerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalespersonsMonthlyPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
