import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerlkNochkbxComponent } from './customerlk-nochkbx.component';

describe('CustomerlkNochkbxComponent', () => {
  let component: CustomerlkNochkbxComponent;
  let fixture: ComponentFixture<CustomerlkNochkbxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerlkNochkbxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerlkNochkbxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
