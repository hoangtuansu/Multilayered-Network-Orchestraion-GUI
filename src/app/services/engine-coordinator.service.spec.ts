import { TestBed } from '@angular/core/testing';

import { EngineCoordinatorService } from './engine-coordinator.service';

describe('EngineCoordinatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EngineCoordinatorService = TestBed.get(EngineCoordinatorService);
    expect(service).toBeTruthy();
  });
});
