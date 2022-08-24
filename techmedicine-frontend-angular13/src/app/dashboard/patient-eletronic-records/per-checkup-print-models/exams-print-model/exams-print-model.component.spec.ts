import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsPrintModelComponent } from './exams-print-model.component';

describe('ExamsPrintModelComponent', () => {
  let component: ExamsPrintModelComponent;
  let fixture: ComponentFixture<ExamsPrintModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamsPrintModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamsPrintModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
