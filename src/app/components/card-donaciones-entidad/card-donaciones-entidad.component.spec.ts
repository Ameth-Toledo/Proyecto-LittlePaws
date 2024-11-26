import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDonacionesEntidadComponent } from './card-donaciones-entidad.component';

describe('CardDonacionesEntidadComponent', () => {
  let component: CardDonacionesEntidadComponent;
  let fixture: ComponentFixture<CardDonacionesEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDonacionesEntidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDonacionesEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
