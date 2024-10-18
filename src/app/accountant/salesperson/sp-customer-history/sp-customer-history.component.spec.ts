import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpCustomerHistoryComponent } from './sp-customer-history.component';

describe('SpCustomerHistoryComponent', () => {
  let component: SpCustomerHistoryComponent;
  let fixture: ComponentFixture<SpCustomerHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpCustomerHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpCustomerHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
