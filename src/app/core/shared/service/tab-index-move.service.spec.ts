import { TestBed } from '@angular/core/testing';

import { TabIndexMoveService } from './tab-index-move.service';

describe('TabIndexMoveService', () => {
  let service: TabIndexMoveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabIndexMoveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
