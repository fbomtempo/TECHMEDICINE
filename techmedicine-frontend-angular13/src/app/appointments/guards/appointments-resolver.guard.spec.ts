import { TestBed } from '@angular/core/testing';

import { AppointmentsResolverGuard } from './appointments-resolver.guard';

describe('AppointmentsResolverGuard', () => {
  let guard: AppointmentsResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AppointmentsResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
