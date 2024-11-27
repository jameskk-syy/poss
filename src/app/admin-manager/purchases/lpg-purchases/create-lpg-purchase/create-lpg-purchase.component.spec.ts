import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLpgPurchaseComponent } from './create-lpg-purchase.component';

describe('CreateLpgPurchaseComponent', () => {
  let component: CreateLpgPurchaseComponent;
  let fixture: ComponentFixture<CreateLpgPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLpgPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLpgPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
