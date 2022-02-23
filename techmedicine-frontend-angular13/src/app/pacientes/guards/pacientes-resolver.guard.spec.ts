import { TestBed } from '@angular/core/testing';

import { PacientesResolverGuard } from './pacientes-resolver.guard';

describe('EspecialidadeResolverGuard', () => {
  let guard: PacientesResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PacientesResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
