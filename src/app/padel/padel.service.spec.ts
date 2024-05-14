import { TestBed } from '@angular/core/testing';

import { PadelService } from './padel.service';

describe('PadelService', () => {
  let service: PadelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PadelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
