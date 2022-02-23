import { TestBed } from '@angular/core/testing';

import { EspecialidadesResolverGuard } from './especialidades-resolver.guard';

describe('EspecialidadeResolverGuard', () => {
  let guard: EspecialidadesResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EspecialidadesResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
