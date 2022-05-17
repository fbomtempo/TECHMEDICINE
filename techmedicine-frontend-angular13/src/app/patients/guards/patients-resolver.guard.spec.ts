import { TestBed } from '@angular/core/testing';

import { PatientsResolverGuard } from './patients-resolver.guard';

describe('PatientsResolverGuard', () => {
  let guard: PatientsResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PatientsResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
