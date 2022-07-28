import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckUpHeaderFormComponent } from './check-up-header-form.component';

describe('CheckUpHeaderFormComponent', () => {
  let component: CheckUpHeaderFormComponent;
  let fixture: ComponentFixture<CheckUpHeaderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckUpHeaderFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckUpHeaderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
