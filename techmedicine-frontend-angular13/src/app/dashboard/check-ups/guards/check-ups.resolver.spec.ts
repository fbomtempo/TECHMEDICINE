import { TestBed } from '@angular/core/testing';

import { CheckUpsResolver } from './check-ups.resolver';

describe('CheckUpsResolver', () => {
  let resolver: CheckUpsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CheckUpsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
