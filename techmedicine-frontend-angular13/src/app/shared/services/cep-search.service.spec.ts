import { TestBed } from '@angular/core/testing';

import { CepSearchService } from './cep-search.service';

describe('CepSearchService', () => {
  let service: CepSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CepSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
