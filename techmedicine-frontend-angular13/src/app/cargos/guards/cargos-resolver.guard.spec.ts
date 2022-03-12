import { TestBed } from '@angular/core/testing';

import { CargosResolverGuard } from './cargos-resolver.guard';

describe('CargosResolverGuard', () => {
  let guard: CargosResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CargosResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
