import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAdopcionesComponent } from './card-adopciones.component';

describe('CardAdopcionesComponent', () => {
  let component: CardAdopcionesComponent;
  let fixture: ComponentFixture<CardAdopcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAdopcionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAdopcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
