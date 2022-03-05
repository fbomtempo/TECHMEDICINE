import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicosFormComponent } from './medicos-form.component';

describe('MedicosFormComponent', () => {
  let component: MedicosFormComponent;
  let fixture: ComponentFixture<MedicosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
