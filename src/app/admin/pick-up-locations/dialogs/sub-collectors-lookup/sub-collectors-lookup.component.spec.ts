import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCollectorsLookupComponent } from './sub-collectors-lookup.component';

describe('SubCollectorsLookupComponent', () => {
  let component: SubCollectorsLookupComponent;
  let fixture: ComponentFixture<SubCollectorsLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCollectorsLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCollectorsLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
