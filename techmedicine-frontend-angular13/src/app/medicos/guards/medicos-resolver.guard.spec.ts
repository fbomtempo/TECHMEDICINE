import { TestBed } from '@angular/core/testing';

import { MedicosResolverGuard } from './medicos-resolver.guard';

describe('MedicosResolverGuard', () => {
  let guard: MedicosResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MedicosResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
