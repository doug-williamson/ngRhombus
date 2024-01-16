import { TestBed } from '@angular/core/testing';

import { NgRhombusService } from './ng-rhombus.service';

describe('NgRhombusService', () => {
  let service: NgRhombusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgRhombusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
