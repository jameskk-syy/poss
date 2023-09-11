import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTotalsCollectionsComponent } from './delete-totals-collections.component';

describe('DeleteTotalsCollectionsComponent', () => {
  let component: DeleteTotalsCollectionsComponent;
  let fixture: ComponentFixture<DeleteTotalsCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTotalsCollectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTotalsCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
