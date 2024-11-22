import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMascotasExtraviadosComponent } from './card-mascotas-extraviados.component';

describe('CardMascotasExtraviadosComponent', () => {
  let component: CardMascotasExtraviadosComponent;
  let fixture: ComponentFixture<CardMascotasExtraviadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMascotasExtraviadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMascotasExtraviadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
