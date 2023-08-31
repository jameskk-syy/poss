import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorsTotalsPerMonthComponent } from './collectors-totals-per-month.component';

describe('CollectorsTotalsPerMonthComponent', () => {
  let component: CollectorsTotalsPerMonthComponent;
  let fixture: ComponentFixture<CollectorsTotalsPerMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectorsTotalsPerMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorsTotalsPerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
