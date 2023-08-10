import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalespersonsSalesComponent } from './salespersons-sales.component';

describe('SalespersonsSalesComponent', () => {
  let component: SalespersonsSalesComponent;
  let fixture: ComponentFixture<SalespersonsSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalespersonsSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalespersonsSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
