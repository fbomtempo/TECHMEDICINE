import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementPrintModelComponent } from './statement-print-model.component';

describe('StatementPrintModelComponent', () => {
  let component: StatementPrintModelComponent;
  let fixture: ComponentFixture<StatementPrintModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementPrintModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementPrintModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
