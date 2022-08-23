import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerPatientDetailsModalComponent } from './per-patient-details-modal.component';

describe('PerPatientDetailsModalComponent', () => {
  let component: PerPatientDetailsModalComponent;
  let fixture: ComponentFixture<PerPatientDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerPatientDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerPatientDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
