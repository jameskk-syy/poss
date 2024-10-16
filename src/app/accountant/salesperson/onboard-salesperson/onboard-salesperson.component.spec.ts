import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardSalespersonComponent } from './onboard-salesperson.component';

describe('OnboardSalespersonComponent', () => {
  let component: OnboardSalespersonComponent;
  let fixture: ComponentFixture<OnboardSalespersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardSalespersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardSalespersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
