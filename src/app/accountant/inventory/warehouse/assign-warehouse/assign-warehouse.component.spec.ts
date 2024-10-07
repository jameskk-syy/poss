import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignWarehouseComponent } from './assign-warehouse.component';

describe('AssignWarehouseComponent', () => {
  let component: AssignWarehouseComponent;
  let fixture: ComponentFixture<AssignWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignWarehouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
