import { TestBed, inject } from '@angular/core/testing';

import { CharterService } from './charter.service';

describe('CharterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CharterService]
    });
  });

  it('should be created', inject([CharterService], (service: CharterService) => {
    expect(service).toBeTruthy();
  }));
});
