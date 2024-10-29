import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEntidadComponent } from './header-entidad.component';

describe('HeaderEntidadComponent', () => {
  let component: HeaderEntidadComponent;
  let fixture: ComponentFixture<HeaderEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderEntidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
