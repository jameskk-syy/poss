import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalespersonLkupComponent } from './salesperson-lkup.component';

describe('SalespersonLkupComponent', () => {
  let component: SalespersonLkupComponent;
  let fixture: ComponentFixture<SalespersonLkupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalespersonLkupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalespersonLkupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
