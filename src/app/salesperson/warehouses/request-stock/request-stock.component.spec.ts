import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestStockComponent } from './request-stock.component';

describe('RequestStockComponent', () => {
  let component: RequestStockComponent;
  let fixture: ComponentFixture<RequestStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
