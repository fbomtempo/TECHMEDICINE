import { TestBed } from '@angular/core/testing';

import { DiseasesResolver } from './diseases.resolver';

describe('DiseasesResolver', () => {
  let resolver: DiseasesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DiseasesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
