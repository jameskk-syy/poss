import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkAllocationComponent } from './milk-allocation.component';

describe('MilkAllocationComponent', () => {
  let component: MilkAllocationComponent;
  let fixture: ComponentFixture<MilkAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilkAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
