import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLpgPurchaseComponent } from './view-lpg-purchase.component';

describe('ViewLpgPurchaseComponent', () => {
  let component: ViewLpgPurchaseComponent;
  let fixture: ComponentFixture<ViewLpgPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLpgPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLpgPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
