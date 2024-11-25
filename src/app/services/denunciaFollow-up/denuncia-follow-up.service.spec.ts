import { TestBed } from '@angular/core/testing';

import { DenunciaFollowUpService } from './denuncia-follow-up.service';

describe('DenunciaFollowUpService', () => {
  let service: DenunciaFollowUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DenunciaFollowUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
