import { TestBed } from '@angular/core/testing';

import { DataTableUtilsService } from './data-table-utils.service';

describe('DataTableUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataTableUtilsService = TestBed.get(DataTableUtilsService);
    expect(service).toBeTruthy();
  });
});
