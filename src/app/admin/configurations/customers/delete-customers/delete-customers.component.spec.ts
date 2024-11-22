import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCustomersComponent } from './delete-customers.component';

describe('DeleteCustomersComponent', () => {
  let component: DeleteCustomersComponent;
  let fixture: ComponentFixture<DeleteCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
