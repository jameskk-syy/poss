import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsPerDayComponent } from './collections-per-day.component';

describe('CollectionsPerDayComponent', () => {
  let component: CollectionsPerDayComponent;
  let fixture: ComponentFixture<CollectionsPerDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionsPerDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsPerDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
