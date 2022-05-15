import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentosCalendarioComponent } from './agendamentos-calendario.component';

describe('AgendamentosCalendarioComponent', () => {
  let component: AgendamentosCalendarioComponent;
  let fixture: ComponentFixture<AgendamentosCalendarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendamentosCalendarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamentosCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
