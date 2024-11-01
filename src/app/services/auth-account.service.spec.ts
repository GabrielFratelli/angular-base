import { TestBed } from '@angular/core/testing';

import { AuthAccountService } from './auth-account.service';

describe('AuthAccountService', () => {
  let service: AuthAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
