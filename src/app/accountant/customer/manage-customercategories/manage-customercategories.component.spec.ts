import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCustomercategoriesComponent } from './manage-customercategories.component';

describe('ManageCustomercategoriesComponent', () => {
  let component: ManageCustomercategoriesComponent;
  let fixture: ComponentFixture<ManageCustomercategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCustomercategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCustomercategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
