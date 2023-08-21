import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyCollectiosChartComponent } from './monthly-collectios-chart.component';

describe('MonthlyCollectiosChartComponent', () => {
  let component: MonthlyCollectiosChartComponent;
  let fixture: ComponentFixture<MonthlyCollectiosChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyCollectiosChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyCollectiosChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
