import { TestBed } from '@angular/core/testing';

import { DrugsResolver } from './drugs.resolver';

describe('DrugsResolver', () => {
  let resolver: DrugsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DrugsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
