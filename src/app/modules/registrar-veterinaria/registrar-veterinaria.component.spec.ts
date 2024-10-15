import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarVeterinariaComponent } from './registrar-veterinaria.component';

describe('RegistrarVeterinariaComponent', () => {
  let component: RegistrarVeterinariaComponent;
  let fixture: ComponentFixture<RegistrarVeterinariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarVeterinariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarVeterinariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
