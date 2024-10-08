import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseLkupComponent } from './warehouse-lkup.component';

describe('WarehouseLkupComponent', () => {
  let component: WarehouseLkupComponent;
  let fixture: ComponentFixture<WarehouseLkupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseLkupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseLkupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
