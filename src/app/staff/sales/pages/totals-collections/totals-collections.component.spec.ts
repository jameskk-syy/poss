import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalsCollectionsComponent } from './totals-collections.component';

describe('TotalsCollectionsComponent', () => {
  let component: TotalsCollectionsComponent;
  let fixture: ComponentFixture<TotalsCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalsCollectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalsCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
