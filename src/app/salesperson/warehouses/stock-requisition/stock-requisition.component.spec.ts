import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockRequisitionComponent } from './stock-requisition.component';

describe('StockRequisitionComponent', () => {
  let component: StockRequisitionComponent;
  let fixture: ComponentFixture<StockRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockRequisitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
