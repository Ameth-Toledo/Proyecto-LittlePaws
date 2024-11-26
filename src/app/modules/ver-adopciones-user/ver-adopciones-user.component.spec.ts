import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAdopcionesUserComponent } from './ver-adopciones-user.component';

describe('VerAdopcionesUserComponent', () => {
  let component: VerAdopcionesUserComponent;
  let fixture: ComponentFixture<VerAdopcionesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerAdopcionesUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerAdopcionesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
