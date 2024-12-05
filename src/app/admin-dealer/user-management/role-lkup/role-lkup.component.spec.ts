import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleLkupComponent } from './role-lkup.component';

describe('RoleLkupComponent', () => {
  let component: RoleLkupComponent;
  let fixture: ComponentFixture<RoleLkupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleLkupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleLkupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
