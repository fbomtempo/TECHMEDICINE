import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcdFormComponent } from './icd-form.component';

describe('IcdFormComponent', () => {
  let component: IcdFormComponent;
  let fixture: ComponentFixture<IcdFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IcdFormComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
