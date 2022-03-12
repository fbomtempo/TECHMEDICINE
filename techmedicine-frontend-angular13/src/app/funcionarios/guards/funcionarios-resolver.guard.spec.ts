import { TestBed } from '@angular/core/testing';

import { FuncionariosResolverGuard } from './funcionarios-resolver.guard';

describe('FuncionariosResolverGuard', () => {
  let guard: FuncionariosResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FuncionariosResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
