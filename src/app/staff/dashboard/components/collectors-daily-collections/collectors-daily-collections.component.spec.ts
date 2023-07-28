import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorsDailyCollectionsComponent } from './collectors-daily-collections.component';

describe('CollectorsDailyCollectionsComponent', () => {
  let component: CollectorsDailyCollectionsComponent;
  let fixture: ComponentFixture<CollectorsDailyCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectorsDailyCollectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorsDailyCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
