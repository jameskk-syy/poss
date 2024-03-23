import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmersPerRouteComponent } from './farmers-per-route.component';

describe('FarmersPerRouteComponent', () => {
  let component: FarmersPerRouteComponent;
  let fixture: ComponentFixture<FarmersPerRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmersPerRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmersPerRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
