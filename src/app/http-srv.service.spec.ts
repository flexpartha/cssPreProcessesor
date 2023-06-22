import { TestBed } from '@angular/core/testing';

import { HttpSrvService } from './http-srv.service';

describe('HttpSrvService', () => {
  let service: HttpSrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpSrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
