import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPurchasesComponent } from './other-purchases.component';

describe('OtherPurchasesComponent', () => {
  let component: OtherPurchasesComponent;
  let fixture: ComponentFixture<OtherPurchasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherPurchasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
