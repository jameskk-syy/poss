import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTotalsCollectionsComponent } from './add-totals-collections.component';

describe('AddTotalsCollectionsComponent', () => {
  let component: AddTotalsCollectionsComponent;
  let fixture: ComponentFixture<AddTotalsCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTotalsCollectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTotalsCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
