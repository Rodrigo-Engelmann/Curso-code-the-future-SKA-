import { TestBed } from '@angular/core/testing';

import { AreasServices } from './areas.services';

describe('AreasServices', () => {
  let service: AreasServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreasServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
