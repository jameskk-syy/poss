import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerLkupComponent } from './manager-lkup.component';

describe('ManagerLkupComponent', () => {
  let component: ManagerLkupComponent;
  let fixture: ComponentFixture<ManagerLkupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerLkupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerLkupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
