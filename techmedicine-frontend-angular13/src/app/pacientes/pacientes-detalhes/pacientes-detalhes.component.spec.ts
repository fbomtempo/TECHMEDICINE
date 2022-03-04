import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesDetalhesComponent } from './pacientes-detalhes.component';

describe('PacientesDetalhesComponent', () => {
  let component: PacientesDetalhesComponent;
  let fixture: ComponentFixture<PacientesDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientesDetalhesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientesDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
