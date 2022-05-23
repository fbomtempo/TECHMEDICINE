import { TestBed } from '@angular/core/testing';

import { SpecialtiesResolver } from './specialties.resolver';

describe('SpecialtiesResolver', () => {
  let resolver: SpecialtiesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SpecialtiesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
