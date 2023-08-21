import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyMilkCollectionPerRouteComponent } from './monthly-milk-collection-per-route.component';

describe('MonthlyMilkCollectionPerRouteComponent', () => {
  let component: MonthlyMilkCollectionPerRouteComponent;
  let fixture: ComponentFixture<MonthlyMilkCollectionPerRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyMilkCollectionPerRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyMilkCollectionPerRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
