import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSalespersonComponent } from './manage-salesperson.component';

describe('ManageSalespersonComponent', () => {
  let component: ManageSalespersonComponent;
  let fixture: ComponentFixture<ManageSalespersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSalespersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSalespersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
