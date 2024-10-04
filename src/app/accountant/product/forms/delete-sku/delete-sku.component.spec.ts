import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSkuComponent } from './delete-sku.component';

describe('DeleteSkuComponent', () => {
  let component: DeleteSkuComponent;
  let fixture: ComponentFixture<DeleteSkuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSkuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
