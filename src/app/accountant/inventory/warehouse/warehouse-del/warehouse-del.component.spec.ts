import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseDelComponent } from './warehouse-del.component';

describe('WarehouseDelComponent', () => {
  let component: WarehouseDelComponent;
  let fixture: ComponentFixture<WarehouseDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseDelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
