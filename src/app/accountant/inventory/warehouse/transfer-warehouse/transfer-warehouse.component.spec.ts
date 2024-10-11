import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferWarehouseComponent } from './transfer-warehouse.component';

describe('TransferWarehouseComponent', () => {
  let component: TransferWarehouseComponent;
  let fixture: ComponentFixture<TransferWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferWarehouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
