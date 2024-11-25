import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDenunciasEntidadComponent } from './card-denuncias-entidad.component';

describe('CardDenunciasEntidadComponent', () => {
  let component: CardDenunciasEntidadComponent;
  let fixture: ComponentFixture<CardDenunciasEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDenunciasEntidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDenunciasEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
