import { TestBed } from '@angular/core/testing';

import { MedicsResolver } from './medics.resolver';

describe('MedicsResolver', () => {
  let resolver: MedicsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MedicsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
