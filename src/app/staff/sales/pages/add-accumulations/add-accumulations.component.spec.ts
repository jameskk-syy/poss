import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccumulationsComponent } from './add-accumulations.component';

describe('AddAccumulationsComponent', () => {
  let component: AddAccumulationsComponent;
  let fixture: ComponentFixture<AddAccumulationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAccumulationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccumulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
