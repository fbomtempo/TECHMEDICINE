import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsListComponent } from './patient-list.component';

describe('ListaPacientesComponent', () => {
  let component: PatientsListComponent;
  let fixture: ComponentFixture<PatientsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
