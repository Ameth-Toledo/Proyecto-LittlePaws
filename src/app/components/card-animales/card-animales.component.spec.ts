import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAnimalesComponent } from './card-animales.component';

describe('CardAnimalesComponent', () => {
  let component: CardAnimalesComponent;
  let fixture: ComponentFixture<CardAnimalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAnimalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAnimalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
