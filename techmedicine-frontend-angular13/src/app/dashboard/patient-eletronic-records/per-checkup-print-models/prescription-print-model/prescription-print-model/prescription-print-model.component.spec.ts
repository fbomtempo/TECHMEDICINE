import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionPrintModelComponent } from './prescription-print-model.component';

describe('PrescriptionPrintModelComponent', () => {
  let component: PrescriptionPrintModelComponent;
  let fixture: ComponentFixture<PrescriptionPrintModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptionPrintModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionPrintModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
