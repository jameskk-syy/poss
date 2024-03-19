import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTotalsCollectionsComponent } from './view-totals-collections.component';

describe('ViewTotalsCollectionsComponent', () => {
  let component: ViewTotalsCollectionsComponent;
  let fixture: ComponentFixture<ViewTotalsCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTotalsCollectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTotalsCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
