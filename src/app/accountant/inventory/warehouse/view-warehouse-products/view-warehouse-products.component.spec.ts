import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWarehouseProductsComponent } from './view-warehouse-products.component';

describe('ViewWarehouseProductsComponent', () => {
  let component: ViewWarehouseProductsComponent;
  let fixture: ComponentFixture<ViewWarehouseProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewWarehouseProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWarehouseProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
