import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockWidgetsComponent } from './stock-widgets.component';

describe('StockWidgetsComponent', () => {
  let component: StockWidgetsComponent;
  let fixture: ComponentFixture<StockWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockWidgetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
