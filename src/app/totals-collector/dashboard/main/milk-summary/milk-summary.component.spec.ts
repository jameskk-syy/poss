import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkSummaryComponent } from './milk-summary.component';

describe('MilkSummaryComponent', () => {
  let component: MilkSummaryComponent;
  let fixture: ComponentFixture<MilkSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilkSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
