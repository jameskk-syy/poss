import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLkupComponent } from './user-lkup.component';

describe('UserLkupComponent', () => {
  let component: UserLkupComponent;
  let fixture: ComponentFixture<UserLkupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLkupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLkupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
