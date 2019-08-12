import { TestBed } from '@angular/core/testing';

import { Engine2DService } from './engine2d.service';

describe('Engine2dService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Engine2DService = TestBed.get(Engine2DService);
    expect(service).toBeTruthy();
  });
});
