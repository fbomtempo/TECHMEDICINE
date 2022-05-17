import { TestBed } from '@angular/core/testing';

import { RolesResolverGuard } from './roles-resolver.guard';

describe('RolesResolverGuard', () => {
  let guard: RolesResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolesResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
