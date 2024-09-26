import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomercategoriesComponent } from './customercategories.component';

describe('CustomercategoriesComponent', () => {
  let component: CustomercategoriesComponent;
  let fixture: ComponentFixture<CustomercategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomercategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomercategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
