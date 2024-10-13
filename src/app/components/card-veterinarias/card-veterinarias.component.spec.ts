import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVeterinariasComponent } from './card-veterinarias.component';

describe('CardVeterinariasComponent', () => {
  let component: CardVeterinariasComponent;
  let fixture: ComponentFixture<CardVeterinariasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardVeterinariasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardVeterinariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
