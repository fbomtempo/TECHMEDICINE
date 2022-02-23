import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadesDetalhesComponent } from './especialidades-detalhes.component';

describe('EspecialidadesDetalhesComponent', () => {
  let component: EspecialidadesDetalhesComponent;
  let fixture: ComponentFixture<EspecialidadesDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspecialidadesDetalhesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadesDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
