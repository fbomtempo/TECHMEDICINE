import { TestBed } from '@angular/core/testing';

import { ExamsResolver } from './exams.resolver';

describe('ExamsResolver', () => {
  let resolver: ExamsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ExamsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
