import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckUpHeaderHeaderListComponent } from './check-up-header-list.component';

describe('CheckUpHeaderHeaderListComponent', () => {
  let component: CheckUpHeaderHeaderListComponent;
  let fixture: ComponentFixture<CheckUpHeaderHeaderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckUpHeaderHeaderListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckUpHeaderHeaderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
