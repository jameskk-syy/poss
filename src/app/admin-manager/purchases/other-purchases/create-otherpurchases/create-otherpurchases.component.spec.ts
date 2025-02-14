import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOtherpurchasesComponent } from './create-otherpurchases.component';

describe('CreateOtherpurchasesComponent', () => {
  let component: CreateOtherpurchasesComponent;
  let fixture: ComponentFixture<CreateOtherpurchasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOtherpurchasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOtherpurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
