import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkuComponent } from './add-sku.component';

describe('AddSkuComponent', () => {
  let component: AddSkuComponent;
  let fixture: ComponentFixture<AddSkuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSkuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
