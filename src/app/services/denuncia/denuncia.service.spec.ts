import { TestBed } from '@angular/core/testing';

import { DenunciasService } from './denuncia.service';

describe('DenunciaService', () => {
  let service: DenunciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DenunciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});