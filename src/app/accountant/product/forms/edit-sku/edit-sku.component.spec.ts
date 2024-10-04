import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSkuComponent } from './edit-sku.component';

describe('EditSkuComponent', () => {
  let component: EditSkuComponent;
  let fixture: ComponentFixture<EditSkuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSkuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
