import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsPerMonthComponent } from './collections-per-month.component';

describe('CollectionsPerMonthComponent', () => {
  let component: CollectionsPerMonthComponent;
  let fixture: ComponentFixture<CollectionsPerMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionsPerMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsPerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
