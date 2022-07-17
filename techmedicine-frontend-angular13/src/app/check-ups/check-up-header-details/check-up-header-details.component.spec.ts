import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckUpHeaderDetailsComponent } from './check-up-header-details.component';

describe('CheckUpHeaderDetailsComponent', () => {
  let component: CheckUpHeaderDetailsComponent;
  let fixture: ComponentFixture<CheckUpHeaderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckUpHeaderDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckUpHeaderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
