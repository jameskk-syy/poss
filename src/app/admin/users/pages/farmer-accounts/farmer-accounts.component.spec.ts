import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerAccountsComponent } from './farmer-accounts.component';

describe('FarmerAccountsComponent', () => {
  let component: FarmerAccountsComponent;
  let fixture: ComponentFixture<FarmerAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
