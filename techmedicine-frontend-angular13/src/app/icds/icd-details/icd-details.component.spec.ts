import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcdDetailsComponent } from './icd-details.component';

describe('IcdDetailsComponent', () => {
  let component: IcdDetailsComponent;
  let fixture: ComponentFixture<IcdDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IcdDetailsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcdDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
