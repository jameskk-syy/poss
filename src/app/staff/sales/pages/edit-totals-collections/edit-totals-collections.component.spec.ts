import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTotalsCollectionsComponent } from './edit-totals-collections.component';

describe('EditTotalsCollectionsComponent', () => {
  let component: EditTotalsCollectionsComponent;
  let fixture: ComponentFixture<EditTotalsCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTotalsCollectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTotalsCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
