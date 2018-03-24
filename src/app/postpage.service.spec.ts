import { TestBed, inject } from '@angular/core/testing';

import { PostpageService } from './postpage.service';

describe('PostpageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostpageService]
    });
  });

  it('should be created', inject([PostpageService], (service: PostpageService) => {
    expect(service).toBeTruthy();
  }));
});
