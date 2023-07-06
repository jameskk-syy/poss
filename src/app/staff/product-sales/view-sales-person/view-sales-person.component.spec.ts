import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSalesPersonComponent } from './view-sales-person.component';

describe('ViewSalesPersonComponent', () => {
  let component: ViewSalesPersonComponent;
  let fixture: ComponentFixture<ViewSalesPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSalesPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSalesPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
