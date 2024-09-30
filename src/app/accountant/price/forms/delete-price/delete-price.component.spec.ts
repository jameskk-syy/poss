import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePriceComponent } from './delete-price.component';

describe('DeletePriceComponent', () => {
  let component: DeletePriceComponent;
  let fixture: ComponentFixture<DeletePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
