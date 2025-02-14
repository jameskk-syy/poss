import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOtherpurchasesComponent } from './view-otherpurchases.component';

describe('ViewOtherpurchasesComponent', () => {
  let component: ViewOtherpurchasesComponent;
  let fixture: ComponentFixture<ViewOtherpurchasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOtherpurchasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOtherpurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
