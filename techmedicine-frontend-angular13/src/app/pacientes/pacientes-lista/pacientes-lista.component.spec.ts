import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesListaComponent } from './pacientes-lista.component';

describe('ListaPacientesComponent', () => {
  let component: PacientesListaComponent;
  let fixture: ComponentFixture<PacientesListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientesListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
