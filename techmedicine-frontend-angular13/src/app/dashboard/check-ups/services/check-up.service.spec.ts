import { TestBed } from '@angular/core/testing';

import { CheckUpService } from './check-up.service';

describe('CheckUpService', () => {
  let service: CheckUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
