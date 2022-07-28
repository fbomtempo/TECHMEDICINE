import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicDetailsComponent } from './medic-details.component';

describe('MedicDetailsComponent', () => {
  let component: MedicDetailsComponent;
  let fixture: ComponentFixture<MedicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
