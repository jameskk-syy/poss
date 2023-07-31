import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyMilkCollectionComponent } from './daily-milk-collection.component';

describe('DailyMilkCollectionComponent', () => {
  let component: DailyMilkCollectionComponent;
  let fixture: ComponentFixture<DailyMilkCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyMilkCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyMilkCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
