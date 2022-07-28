import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerPatientPageComponent } from './per-patient-page.component';

describe('PerPatientPageComponent', () => {
  let component: PerPatientPageComponent;
  let fixture: ComponentFixture<PerPatientPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerPatientPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerPatientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
