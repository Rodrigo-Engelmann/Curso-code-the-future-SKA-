import { TestBed } from '@angular/core/testing';

import { MilestonesServices } from './milestones.services';

describe('MilestonesServices', () => {
  let service: MilestonesServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MilestonesServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
