import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAnimalesEntidadComponent } from './card-animales-entidad.component';

describe('CardAnimalesEntidadComponent', () => {
  let component: CardAnimalesEntidadComponent;
  let fixture: ComponentFixture<CardAnimalesEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAnimalesEntidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAnimalesEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
