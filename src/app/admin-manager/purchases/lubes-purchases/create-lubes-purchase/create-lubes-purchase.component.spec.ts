import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLubesPurchaseComponent } from './create-lubes-purchase.component';

describe('CreateLubesPurchaseComponent', () => {
  let component: CreateLubesPurchaseComponent;
  let fixture: ComponentFixture<CreateLubesPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLubesPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLubesPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
