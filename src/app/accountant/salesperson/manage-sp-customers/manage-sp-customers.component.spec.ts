import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSpCustomersComponent } from './manage-sp-customers.component';

describe('ManageSpCustomersComponent', () => {
  let component: ManageSpCustomersComponent;
  let fixture: ComponentFixture<ManageSpCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSpCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSpCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
