import { TestBed } from '@angular/core/testing';

import { SpecialtiesResolver } from './specialties-resolver.guard';

describe('EspecialidadeResolverGuard', () => {
  let guard: SpecialtiesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SpecialtiesResolver);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
