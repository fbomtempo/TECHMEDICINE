import { TestBed } from '@angular/core/testing';

import { EmployeesResolver } from './employees.resolver';

describe('EmployeesResolver', () => {
  let resolver: EmployeesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EmployeesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
