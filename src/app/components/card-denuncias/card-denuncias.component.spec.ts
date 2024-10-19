import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDenunciasComponent } from './card-denuncias.component';

describe('CardDenunciasComponent', () => {
  let component: CardDenunciasComponent;
  let fixture: ComponentFixture<CardDenunciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDenunciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDenunciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
