import { TestBed } from '@angular/core/testing';

import { PatientsResolver } from './patients.resolver';

describe('PatientsResolver', () => {
  let resolver: PatientsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PatientsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
