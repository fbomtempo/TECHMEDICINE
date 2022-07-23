import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcdListComponent } from './icd-list.component';

describe('IcdListComponent', () => {
  let component: IcdListComponent;
  let fixture: ComponentFixture<IcdListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IcdListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
