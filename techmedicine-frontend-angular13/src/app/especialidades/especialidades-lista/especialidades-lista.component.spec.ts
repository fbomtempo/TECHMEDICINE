import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadesListaComponent } from './especialidades-lista.component';

describe('EspecialidadesListaComponent', () => {
  let component: EspecialidadesListaComponent;
  let fixture: ComponentFixture<EspecialidadesListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspecialidadesListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
