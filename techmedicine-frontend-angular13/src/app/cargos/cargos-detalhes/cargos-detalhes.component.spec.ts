import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargosDetalhesComponent } from './cargos-detalhes.component';

describe('CargosDetalhesComponent', () => {
  let component: CargosDetalhesComponent;
  let fixture: ComponentFixture<CargosDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargosDetalhesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargosDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
