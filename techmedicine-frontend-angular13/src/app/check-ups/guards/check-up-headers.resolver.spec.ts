import { TestBed } from '@angular/core/testing';

import { CheckUpHeadersResolver } from './check-up-headers.resolver';

describe('CheckUpHeadersResolver', () => {
  let resolver: CheckUpHeadersResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CheckUpHeadersResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
