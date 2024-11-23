import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasExtraviadasComponent } from './mascotas-extraviadas.component';

describe('MascotasExtraviadasComponent', () => {
  let component: MascotasExtraviadasComponent;
  let fixture: ComponentFixture<MascotasExtraviadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotasExtraviadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotasExtraviadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
