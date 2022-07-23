import { TestBed } from '@angular/core/testing';

import { IcdsResolver } from './icds.resolver';

describe('IcdsResolver', () => {
  let resolver: IcdsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(IcdsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
