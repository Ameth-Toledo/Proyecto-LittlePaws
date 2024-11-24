import { TestBed } from '@angular/core/testing';

import { MascotasExtraviadasService } from './mascotas-extraviadas.service';

describe('MascotasExtraviadasService', () => {
  let service: MascotasExtraviadasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MascotasExtraviadasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
