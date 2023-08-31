import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkAccumulationComponent } from './milk-accumulation.component';

describe('MilkAccumulationComponent', () => {
  let component: MilkAccumulationComponent;
  let fixture: ComponentFixture<MilkAccumulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilkAccumulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkAccumulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
