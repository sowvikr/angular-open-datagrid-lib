import { TestBed } from '@angular/core/testing';

import { StringUtilsService } from './string-utils.service';

describe('StringUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StringUtilsService = TestBed.get(StringUtilsService);
    expect(service).toBeTruthy();
  });
});
