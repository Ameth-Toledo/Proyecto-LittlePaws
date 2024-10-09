import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilVeterinariaComponent } from './perfil-veterinaria.component';

describe('PerfilVeterinariaComponent', () => {
  let component: PerfilVeterinariaComponent;
  let fixture: ComponentFixture<PerfilVeterinariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilVeterinariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilVeterinariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
