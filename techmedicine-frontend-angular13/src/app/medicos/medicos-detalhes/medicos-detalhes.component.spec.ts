import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicosDetalhesComponent } from './medicoss-detalhes.component';

describe('MedicosDetalhesComponent', () => {
  let component: MedicosDetalhesComponent;
  let fixture: ComponentFixture<MedicosDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicosDetalhesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicosDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
