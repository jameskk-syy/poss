import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateDeactivateBranchComponent } from './activate-deactivate-branch.component';

describe('ActivateDeactivateBranchComponent', () => {
  let component: ActivateDeactivateBranchComponent;
  let fixture: ComponentFixture<ActivateDeactivateBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateDeactivateBranchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateDeactivateBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
