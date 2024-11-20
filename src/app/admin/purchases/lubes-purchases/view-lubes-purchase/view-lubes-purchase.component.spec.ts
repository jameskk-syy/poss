import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLubesPurchaseComponent } from './view-lubes-purchase.component';

describe('ViewLubesPurchaseComponent', () => {
  let component: ViewLubesPurchaseComponent;
  let fixture: ComponentFixture<ViewLubesPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLubesPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLubesPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
