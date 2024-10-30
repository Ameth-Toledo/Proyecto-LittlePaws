import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEntidadComponent } from './card-entidad.component';

describe('CardEntidadComponent', () => {
  let component: CardEntidadComponent;
  let fixture: ComponentFixture<CardEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEntidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
