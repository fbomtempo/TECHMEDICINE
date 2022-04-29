import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentosFormComponent } from './agendamentos-form.component';

describe('AgendamentosFormComponent', () => {
  let component: AgendamentosFormComponent;
  let fixture: ComponentFixture<AgendamentosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendamentosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamentosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
