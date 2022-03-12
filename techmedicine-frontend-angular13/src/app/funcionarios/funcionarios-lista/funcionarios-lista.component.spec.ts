import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosListaComponent } from './funcionarios-lista.component';

describe('FuncionariosListaComponent', () => {
  let component: FuncionariosListaComponent;
  let fixture: ComponentFixture<FuncionariosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncionariosListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionariosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
