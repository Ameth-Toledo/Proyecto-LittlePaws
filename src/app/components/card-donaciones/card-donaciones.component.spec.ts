import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDonacionesComponent } from './card-donaciones.component';

describe('CardDonacionesComponent', () => {
  let component: CardDonacionesComponent;
  let fixture: ComponentFixture<CardDonacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDonacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDonacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
