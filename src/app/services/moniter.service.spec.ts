import { TestBed, inject } from '@angular/core/testing';

import { MoniterService } from './moniter.service';

describe('MoniterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoniterService]
    });
  });

  it('should ...', inject([MoniterService], (service: MoniterService) => {
    expect(service).toBeTruthy();
  }));
});
