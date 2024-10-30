import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInvoiceItemsComponent } from './view-invoice-items.component';

describe('ViewInvoiceItemsComponent', () => {
  let component: ViewInvoiceItemsComponent;
  let fixture: ComponentFixture<ViewInvoiceItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInvoiceItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInvoiceItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
