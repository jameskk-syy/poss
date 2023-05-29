import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductConfigComponent } from './edit-product-config.component';

describe('EditProductConfigComponent', () => {
  let component: EditProductConfigComponent;
  let fixture: ComponentFixture<EditProductConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
