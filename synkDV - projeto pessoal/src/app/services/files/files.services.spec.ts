import { TestBed } from '@angular/core/testing';

import { FilesServices } from './files.services';

describe('FilesServices', () => {
  let service: FilesServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilesServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
