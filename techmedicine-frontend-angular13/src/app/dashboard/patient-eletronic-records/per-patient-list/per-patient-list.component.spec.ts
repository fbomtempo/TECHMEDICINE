import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerPatientListComponent } from './per-patient-list.component';

describe('PerPatientListComponent', () => {
  let component: PerPatientListComponent;
  let fixture: ComponentFixture<PerPatientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerPatientListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerPatientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
