import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAdopcionesUserComponent } from './card-adopciones-user.component';

describe('CardAdopcionesUserComponent', () => {
  let component: CardAdopcionesUserComponent;
  let fixture: ComponentFixture<CardAdopcionesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAdopcionesUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAdopcionesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
