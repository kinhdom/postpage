import { TestBed, inject } from '@angular/core/testing';

import { DashboardserviceService } from './dashboardservice.service';

describe('DashboardserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardserviceService]
    });
  });

  it('should be created', inject([DashboardserviceService], (service: DashboardserviceService) => {
    expect(service).toBeTruthy();
  }));
});
