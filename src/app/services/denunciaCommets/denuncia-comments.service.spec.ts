import { TestBed } from '@angular/core/testing';

import { DenunciaCommentsService } from './denuncia-comments.service';

describe('DenunciaCommentsService', () => {
  let service: DenunciaCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DenunciaCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
