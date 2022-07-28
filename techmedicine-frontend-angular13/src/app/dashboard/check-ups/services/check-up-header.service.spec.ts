import { TestBed } from '@angular/core/testing';

import { CheckUpHeaderService } from './check-up-header.service';

describe('CheckUpHeaderService', () => {
  let service: CheckUpHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckUpHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
