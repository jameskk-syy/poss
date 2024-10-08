import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuLkupComponent } from './sku-lkup.component';

describe('SkuLkupComponent', () => {
  let component: SkuLkupComponent;
  let fixture: ComponentFixture<SkuLkupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkuLkupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuLkupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
