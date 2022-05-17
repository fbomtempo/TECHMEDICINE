import { TestBed } from '@angular/core/testing';

import { MedicsResolverGuard } from './medics-resolver.guard';

describe('MedicsResolverGuard', () => {
  let guard: MedicsResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MedicsResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
